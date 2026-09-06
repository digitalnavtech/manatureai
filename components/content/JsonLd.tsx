/**
 * Renders a JSON-LD <script> tag. Input is JSON.stringify'd and `<` is
 * escaped so a malicious value (e.g. from user content) cannot break out
 * of the script context.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
