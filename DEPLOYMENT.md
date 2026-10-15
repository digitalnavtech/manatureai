# ManatureAI production deployment

This deployment runs ManatureAI as a standalone Next.js container behind the Traefik instance already installed on the VPS. It does not publish port 3000 on the host and does not create or change a Traefik container.

Pushes to `main` and manual `workflow_dispatch` runs are checked and then deployed by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow reads the discovered absolute checkout path from the `VPS_DEPLOY_DIR` repository variable, preserves the existing `.env`, validates the Compose configuration and external Traefik network, and recreates only the `manatureai` service with `--no-deps`. The workflow never runs `docker compose down` or `--remove-orphans`.

This repository deliberately does not guess a VPS directory. Complete the discovery procedure below and set `VPS_DEPLOY_DIR` before enabling the workflow. Configure the GitHub `production` environment with a required reviewer while validating the first deployment so a push cannot deploy without approval.

Do not merge or manually run this workflow until the secrets, pinned host key, discovered directory, repository access, and deployment-user permissions below have all been verified.

## Prerequisites

- DNS `A` records for `manatureai.com` (and `www.manatureai.com` only if it will be added to the router rule) point to `72.62.116.152`.
- TCP ports 80 and 443 reach the existing Traefik instance.
- Docker Engine and the Docker Compose plugin are installed on the VPS.
- The existing Traefik Docker network and ACME certificate resolver names have been identified as described below.
- The actual ManatureAI checkout directory has been discovered on the VPS and stored as the `VPS_DEPLOY_DIR` Actions repository variable.

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

## 4. Discover the existing project directory

Do not assume `/opt/manatureai`. If the current container was created by Docker Compose, its Compose labels record the working directory and Compose file. Run these read-only commands on the VPS:

```bash
docker ps --filter label=com.docker.compose.service=manatureai \
  --format 'table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}'
docker inspect manatureai \
  --format '{{ index .Config.Labels "com.docker.compose.project.working_dir" }}'
docker inspect manatureai \
  --format '{{ index .Config.Labels "com.docker.compose.project.config_files" }}'
```

If the container has a different name, replace `manatureai` with the name from the first command. If no current container exists, locate candidate Compose files in the administrator-approved application roots rather than searching or modifying the entire server:

```bash
find /opt /srv /var/www /home -maxdepth 5 -type f \
  \( -name 'docker-compose.yml' -o -name 'docker-compose.yaml' -o -name 'compose.yml' -o -name 'compose.yaml' \) \
  -exec grep -l 'manatureai:' {} \; 2>/dev/null
```

Set `PROJECT_DIR` to the exact result and verify it. These commands do not modify the checkout or containers:

```bash
PROJECT_DIR='/actual/path/from-discovery'
test "$PROJECT_DIR" != '/'
test -d "$PROJECT_DIR/.git"
test -f "$PROJECT_DIR/docker-compose.yml"
test -f "$PROJECT_DIR/.env"
git -C "$PROJECT_DIR" remote get-url origin
docker compose --project-directory "$PROJECT_DIR" \
  -f "$PROJECT_DIR/docker-compose.yml" -p manatureai config --quiet
```

Record the confirmed absolute value; it becomes the GitHub repository variable `VPS_DEPLOY_DIR`. Do not put the path into the workflow source.

## 5. Prepare ManatureAI on the VPS

If discovery found an existing valid checkout, keep it and skip the clone. For a first installation only, have the administrator choose and create the final directory, assign it to the deployment user, and then clone with the repository SSH URL so the VPS can fetch future commits without storing a GitHub password or personal access token:

```bash
PROJECT_DIR='/administrator/approved/path'
sudo mkdir -p "$PROJECT_DIR"
sudo chown "$USER":"$USER" "$PROJECT_DIR"
git clone git@github.com:OWNER/REPOSITORY.git "$PROJECT_DIR"
cd "$PROJECT_DIR"
```

For a private repository, create a separate read-only GitHub deploy key on the VPS. Do not reuse the GitHub Actions key or a personal workstation key:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/manatureai_github -C manatureai-vps -N ''
cat ~/.ssh/manatureai_github.pub
```

Add the displayed public key in GitHub under **Repository settings > Deploy keys** without write access. Pin GitHub's host key from a trusted source in `~/.ssh/known_hosts`, then add a host entry that selects this key:

```sshconfig
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/manatureai_github
  IdentitiesOnly yes
```

Test repository access and the initial fetch:

```bash
chmod 600 ~/.ssh/config ~/.ssh/manatureai_github
ssh -T git@github.com
git -C "$PROJECT_DIR" fetch origin main
```

Create the production environment file once. The CI/CD workflow requires this file to exist and never creates, replaces, copies, or prints it:

```bash
cd "$PROJECT_DIR"
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
docker compose -p manatureai up -d --build --no-deps manatureai
docker compose -p manatureai ps
```

Compose replaces the ManatureAI container when necessary. It does not recreate Traefik or other Compose projects.

## 6. Configure SSH access for GitHub Actions

Create a dedicated deployment key on a trusted administrator machine. The private key is stored only in GitHub Actions; append only its public key to the VPS account that owns the discovered project directory:

```bash
ssh-keygen -t ed25519 -f manatureai_actions -C manatureai-github-actions -N ''
ssh-copy-id -i manatureai_actions.pub -p 22 DEPLOY_USER@72.62.116.152
```

If `ssh-copy-id` is unavailable, append the contents of `manatureai_actions.pub` to `~/.ssh/authorized_keys` on the VPS. Set `~/.ssh` to mode `700` and `authorized_keys` to mode `600`. The deployment user must be able to read/write `VPS_DEPLOY_DIR`, fetch its Git repository, and run `docker`, including Docker Compose and network inspection, without an interactive password. Rootless Docker is the least-privilege option. Membership in the conventional `docker` group is effectively root-level access; use it only if that risk is accepted. Do not grant unrestricted passwordless `sudo` merely for this workflow.

Obtain the VPS SSH host-key fingerprint through a trusted channel such as the Hostinger console or the server administrator. At the VPS console, an administrator can display the Ed25519 fingerprint with:

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub -E sha256
```

On the trusted administrator machine, collect the public key and compare its fingerprint to the console value. `ssh-keyscan` alone does not authenticate the key:

```bash
ssh-keyscan -p 22 -t ed25519 -H 72.62.116.152 > vps_known_hosts
ssh-keygen -lf vps_known_hosts -E sha256
```

Only after the fingerprints match, copy the complete `vps_known_hosts` line into GitHub. For a non-default port the host field will normally be `[host]:port`. The workflow writes this pinned key to its own `known_hosts` file and requires `StrictHostKeyChecking=yes`; it never uses `ssh-keyscan` during a run.

In GitHub, add these **Actions repository secrets** under **Settings > Secrets and variables > Actions**:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS hostname or IP address, for example `72.62.116.152`. |
| `VPS_USER` | Dedicated SSH deployment account. |
| `VPS_SSH_KEY` | Entire private key generated for GitHub Actions, including the BEGIN/END lines. |
| `VPS_PORT` | SSH port, normally `22`. |

Also add these **Actions repository variables**:

| Variable | Value |
| --- | --- |
| `VPS_KNOWN_HOSTS` | Complete, independently verified `known_hosts` line for the VPS and configured port. |
| `VPS_DEPLOY_DIR` | Exact absolute project directory confirmed in section 4. |

SSH host keys are public information, so `VPS_KNOWN_HOSTS` does not need to be a secret. Pinning it prevents a man-in-the-middle connection.

GitHub masks registered secrets, and the workflow does not echo them. The workflow grants only read access to repository contents, disables persisted checkout credentials, pins its actions to commit SHAs, validates the SSH parameters, and uses strict host-key checking.

Before the first automatic deployment, confirm that the deployment user can run these commands non-interactively:

```bash
ssh -p 22 DEPLOY_USER@72.62.116.152
git -C "$PROJECT_DIR" fetch origin main
docker compose --project-directory "$PROJECT_DIR" \
  -f "$PROJECT_DIR/docker-compose.yml" -p manatureai config --quiet
docker network inspect TRAEFIK_NETWORK_NAME
```

The CI/CD sequence is `npm ci`, ESLint, TypeScript checking, a production Next.js build, a Docker image build, and verification that the Google Search Console file exists in the final image. Deployment runs only if every check succeeds. On the VPS it refuses a missing `.env`, any non-ignored worktree changes, non-fast-forward updates, an unexpected commit, an invalid Compose model, or a missing Traefik network. After recreating only `manatureai`, it checks `/` and the verification file from inside the container and then repeats both checks through public HTTPS.

## 7. Verify the deployment and HTTPS

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
curl -fsS https://manatureai.com/googleefaa51ff78d78aac.html
curl -fsS https://manatureai.com/ > /dev/null && echo 'HTTPS request succeeded'
openssl s_client -connect manatureai.com:443 -servername manatureai.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

The HTTPS response should be successful, and the certificate names and validity dates should cover `manatureai.com`. HTTP-to-HTTPS redirection depends on the existing Traefik entrypoint configuration; this Compose file deliberately does not alter it.

The verification-file response must be exactly `google-site-verification: googleefaa51ff78d78aac.html`. The Dockerfile copies `public/` into the standalone runtime image, so Next.js serves this file at the site root.

## 8. Inspect logs

Follow application logs:

```bash
docker compose -p manatureai logs --tail 200 -f manatureai
```

For routing or certificate problems, inspect the existing Traefik container separately:

```bash
docker logs --tail 200 -f traefik
```

Press `Ctrl+C` to stop following logs; the containers continue running.

## 9. Restart and update

Restart the application without rebuilding:

```bash
docker compose -p manatureai restart manatureai
```

Normal updates happen automatically after a reviewed commit is pushed to `main`. For a manual update, keep the existing `.env` in place, require a clean checkout, fast-forward to `origin/main`, validate the Compose model, then rebuild only the application service:

```bash
cd "$PROJECT_DIR"
git diff --quiet && git diff --cached --quiet
git fetch origin main
git merge --ff-only origin/main
docker compose -p manatureai config
docker compose -p manatureai up -d --build --no-deps manatureai
docker compose -p manatureai ps
curl -fsS https://manatureai.com/ > /dev/null
```

Do not run `docker compose down`: it creates unnecessary downtime. Keep the previous image until the new deployment has been verified.

## 10. Roll back a failed deployment

Select a previously reviewed commit, create a temporary rollback branch from it, and push that branch through the same checks before fast-forwarding or reverting `main`. For an emergency manual rollback, check out the known commit in the discovered project directory without modifying `.env`, then rebuild the application service:

```bash
cd "$PROJECT_DIR"
git checkout --detach <previous-commit>
docker compose -p manatureai config
docker compose -p manatureai up -d --build --no-deps manatureai
docker compose -p manatureai ps
curl -fsS https://manatureai.com/ > /dev/null
```

Because every deployment uses the same Compose project and service name, `up -d ... manatureai` targets only ManatureAI. Review application and Traefik logs after rollback. Do not use `docker system prune`; retaining earlier images makes recovery safer.

## Environment variable timing

| Variable | Required | When read | Purpose |
| --- | --- | --- | --- |
| `TRAEFIK_NETWORK` | Yes for Compose deployment | Compose configuration time | Connects ManatureAI to the existing Traefik Docker network and tells Traefik which network to use. |
| `TRAEFIK_CERT_RESOLVER` | Yes for Compose deployment | Compose configuration time | Selects the existing Traefik ACME/Let's Encrypt resolver. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Docker image build time | Adds a Google site verification metadata value. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Docker image build time | Enables the Google Analytics script when set. |

`NEXT_PUBLIC_*` variables are public by design and are embedded in generated client/static assets. Changing either one requires rebuilding the Docker image. No server-only runtime secrets are currently referenced by the application.
