import { readdir, readFile, writeFile, stat } from "node:fs/promises"
import path from "node:path"

const root = path.resolve(process.cwd(), "node_modules/@noble/curves")

const importWithTsSuffix = /(from\s+["']\.\/[^"']+)\.ts(["'])/g
const importWithSrcSegment = /(from\s+["'][^"']*?)\/src\/([^"']+["'])/g

async function patchFile(filePath) {
  const original = await readFile(filePath, "utf8")
  const patched = original
    .replace(importWithTsSuffix, "$1.js$2")
    .replace(importWithSrcSegment, "$1/$2")

  if (patched === original) {
    return false
  }

  await writeFile(filePath, patched, "utf8")
  return true
}

async function patchDir(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true })
  let changed = 0

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      changed += await patchDir(entryPath)
      continue
    }

    if (!entry.isFile() || !entry.name.endsWith(".d.ts")) {
      continue
    }

    const didChange = await patchFile(entryPath)
    if (didChange) {
      changed += 1
    }
  }

  return changed
}

async function run() {
  let rootExists = false

  try {
    rootExists = (await stat(root)).isDirectory()
  } catch {
    rootExists = false
  }

  if (!rootExists) {
    console.log("[fix-noble-curves-dts] skipped: @noble/curves not found")
    return
  }

  const changedFiles = await patchDir(root)

  console.log(`[fix-noble-curves-dts] patched files: ${changedFiles}`)
}

run().catch((error) => {
  console.error("[fix-noble-curves-dts] failed", error)
  process.exitCode = 1
})
