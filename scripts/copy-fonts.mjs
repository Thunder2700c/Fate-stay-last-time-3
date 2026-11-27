import { mkdir, readdir, readFile, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "lib/fonts.json"), "utf8"));
const output = path.join(root, "public/fonts");
await mkdir(output, { recursive: true });
for (const font of catalog.fonts) {
  const filesDir = path.join(root, "node_modules", ...font.package.split("/"), "files");
  let files;
  try { files = await readdir(filesDir); }
  catch { throw new Error(`Missing font package: ${font.package}. Run npm install first.`); }
  const latin = files.filter((file) => file.endsWith(".woff2") && /-latin-(?:[0-9]{3}|wght)-/.test(file)).sort();
  if (!latin.length) throw new Error(`No Latin WOFF2 files found for ${font.family}.`);
  const faces = [];
  for (const file of latin) {
    const outputName = `${font.slug}-${file}`;
    await copyFile(path.join(filesDir, file), path.join(output, outputName));
    const variable = /-wght-/.test(file);
    const weight = variable ? "100 900" : (file.match(/-latin-([0-9]{3})-/)?.[1] ?? "400");
    const style = /-italic\.woff2$/.test(file) ? "italic" : "normal";
    faces.push(`@font-face{font-family:"${font.family}";src:url("/fonts/${outputName}") format("woff2");font-style:${style};font-weight:${weight};font-display:swap;font-synthesis:none;}`);
  }
  await writeFile(path.join(output, `${font.slug}.css`), faces.join("\n") + "\n", "utf8");
}
console.log(`Prepared ${catalog.fonts.length} self-hosted Latin WOFF2 font families.`);
