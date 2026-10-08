# ManatureAI production deployment

This deployment runs ManatureAI as a standalone Next.js container behind the Traefik instance already installed on the VPS. It does not publish port 3000 on the host and does not create or change a Traefik container.

## Prerequisites

- DNS `A` records for `manatureai.com` (and `www.manatureai.com` only if it will be added to the router rule) point to `72.62.116.152`.
- TCP ports 80 and 443 reach the existing Traefik instance.
- Docker Engine and the Docker Compose plugin are installed on the VPS.
- The existing Traefik Docker network and ACME certificate resolver names have been identified as described below.

## 1. Connect to the Hostinger VPS

From PowerShell, Terminal, or another SSH client, replace `root` if Hostinger gave you a different administrative user:

```bash
ssh root@72.62.116.152
```

Prefer SSH keys. If a key file is required explicitly:

```bash
ssh -i /path/to/private-key root@72.62.116.152
```

## 2. Inspect the existing Docker environment

All commands in this section are read-only:

```bash
docker version
docker compose version
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
docker network ls
```

Find the existing Traefik container name from `docker ps`, then inspect its attached networks, startup arguments, labels, and mounts. Replace `traefik` below if the container has another name:

```bash
docker inspect traefik --format '{{json .NetworkSettings.Networks}}'
docker inspect traefik --format '{{json .Config.Cmd}}'
docker inspect traefik --format '{{json .Config.Labels}}'
docker inspect traefik --format '{{json .Mounts}}'
```

Choose the existing shared proxy network attached to Traefik. Do not use `bridge` or create a similarly named replacement network. Record the exact Docker network name as `TRAEFIK_NETWORK`.

## 3. Identify the certificate resolver

The resolver name is the segment represented by `<name>` in a Traefik option such as:

```text
--certificatesresolvers.<name>.acme.email=...
--certificatesresolvers.<name>.acme.storage=...
```

First inspect the Traefik command shown above. Existing application labels can also reveal the resolver currently in use:

```bash
docker inspect $(docker ps -q) --format '{{.Name}} {{json .Config.Labels}}' | grep -i certresolver
```

If Traefik loads static configuration from a mounted YAML or TOML file, use the mounts from `docker inspect` to locate that file and read it without editing it. Look under `certificatesResolvers` and record the exact resolver key as `TRAEFIK_CERT_RESOLVER`. Traefik logs can confirm ACME activity:

```bash
docker logs --tail 200 traefik 2>&1 | grep -iE 'acme|certificate|resolver'
```

## 4. Prepare and deploy ManatureAI

Transfer the project to a dedicated directory such as `/opt/manatureai`. Do not copy `.env`, `.git`, `node_modules`, or `.next` from the development machine. Keep each uploaded release in its own timestamped directory so it remains available for rollback.

In the release directory, create the deployment environment file from the committed template:

```bash
cp .env.example .env
nano .env
chmod 600 .env
```

Set `TRAEFIK_NETWORK` and `TRAEFIK_CERT_RESOLVER` to the exact values discovered on the VPS. The two `NEXT_PUBLIC_*` values are optional; leave either empty to disable that integration. The `.env` file is ignored by Git and Docker's build context.

Validate interpolation and the external network before building:

```bash
docker compose -p manatureai config
docker network inspect "$(sed -n 's/^TRAEFIK_NETWORK=//p' .env)"
```

Build and start only this Compose project:

```bash
docker compose -p manatureai build --pull
docker compose -p manatureai up -d
docker compose -p manatureai ps
```

Compose replaces the ManatureAI container when necessary. It does not recreate Traefik or other Compose projects.

## 5. Verify the deployment and HTTPS

Confirm that ManatureAI is running and attached to the expected network:

```bash
docker inspect manatureai --format '{{json .NetworkSettings.Networks}}'
docker inspect manatureai --format '{{json .Config.Labels}}'
docker logs --tail 100 manatureai
```

Test the public route, certificate, and redirect behavior:

```bash
curl -I http://manatureai.com
curl -I https://manatureai.com
curl -fsS https://manatureai.com/ > /dev/null && echo 'HTTPS request succeeded'
openssl s_client -connect manatureai.com:443 -servername manatureai.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

The HTTPS response should be successful, and the certificate names and validity dates should cover `manatureai.com`. HTTP-to-HTTPS redirection depends on the existing Traefik entrypoint configuration; this Compose file deliberately does not alter it.

## 6. Inspect logs

Follow application logs:

```bash
docker compose -p manatureai logs --tail 200 -f manatureai
```

For routing or certificate problems, inspect the existing Traefik container separately:

```bash
docker logs --tail 200 -f traefik
```

Press `Ctrl+C` to stop following logs; the containers continue running.

## 7. Restart and update

Restart the application without rebuilding:

```bash
docker compose -p manatureai restart manatureai
```

For an update, upload the new source into a new release directory, copy the previous release's `.env` into it, validate the Compose model, then rebuild and start it:

```bash
docker compose -p manatureai config
docker compose -p manatureai build --pull
docker compose -p manatureai up -d
docker compose -p manatureai ps
curl -fsS https://manatureai.com/ > /dev/null
```

Keep the previous release directory and image until the new release has been verified.

## 8. Roll back a failed deployment

Return to the previous release directory containing its source and `.env`, then rebuild from that known version:

```bash
cd /opt/manatureai/releases/<previous-release>
docker compose -p manatureai config
docker compose -p manatureai build
docker compose -p manatureai up -d
docker compose -p manatureai ps
curl -fsS https://manatureai.com/ > /dev/null
```

Because every deployment uses the same Compose project name and container name, `up -d` replaces only the ManatureAI service. Review application and Traefik logs after rollback. Do not use `docker system prune`; retaining earlier release directories and images makes recovery safer.

## Environment variable timing

| Variable | Required | When read | Purpose |
| --- | --- | --- | --- |
| `TRAEFIK_NETWORK` | Yes for Compose deployment | Compose configuration time | Connects ManatureAI to the existing Traefik Docker network and tells Traefik which network to use. |
| `TRAEFIK_CERT_RESOLVER` | Yes for Compose deployment | Compose configuration time | Selects the existing Traefik ACME/Let's Encrypt resolver. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Docker image build time | Adds a Google site verification metadata value. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Docker image build time | Enables the Google Analytics script when set. |

`NEXT_PUBLIC_*` variables are public by design and are embedded in generated client/static assets. Changing either one requires rebuilding the Docker image. No server-only runtime secrets are currently referenced by the application.
