import { mkdir, copyFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "..", "..", "FE-Proto");
const distDir = join(__dirname, "..", "dist");

async function cp(src, dest) {
  const entries = await readdir(src, { withFileTypes: true });
  await mkdir(dest, { recursive: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      await cp(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  console.log(`Building from ${srcDir} -> ${distDir}`);
  await cp(srcDir, distDir);
  console.log("Build complete.");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
