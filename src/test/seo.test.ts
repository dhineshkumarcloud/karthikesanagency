import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const readProjectFile = (relativePath: string) =>
  readFileSync(fileURLToPath(new URL(`../../${relativePath}`, import.meta.url)), "utf8");

describe("technical SEO assets", () => {
  const html = readProjectFile("index.html");
  const sitemap = readProjectFile("public/sitemap.xml");
  const robots = readProjectFile("public/robots.txt");

  it("publishes one canonical home page with essential metadata", () => {
    expect(html).toMatch(/<html lang="en">/);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).toContain('name="description"');
    expect(html).toContain('rel="canonical" href="https://karthikesanagency.in/"');
    expect(html).toContain('name="robots" content="index, follow');
  });

  it("contains valid, connected business structured data", () => {
    const match = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    expect(match?.[1]).toBeTruthy();
    const schema = JSON.parse(match![1]) as Array<Record<string, unknown>>;
    const business = schema.find((entry) => entry["@type"] === "WholesaleStore");
    expect(business).toMatchObject({
      "@id": "https://karthikesanagency.in/#organization",
      name: "Karthikesan Agencies",
      telephone: "+91-8973373770",
    });
    expect(business?.address).toBeTruthy();
  });

  it("does not submit hash fragments as indexable pages", () => {
    expect(sitemap).toContain("https://karthikesanagency.in/");
    expect(sitemap).not.toContain("#");
    expect(robots).toContain("Sitemap: https://karthikesanagency.in/sitemap.xml");
  });
});
