
import fs from "fs"
import { readdir, compile, writeFile } from './utils'
import path from "path";
import { Config } from './types'

export const transform = async (options: Config) => {
  const {
    files,
    include
  } = options


  let compiledFiles = 0
  const dirOrFiles = (files ?? []).concat(include)
  for (const dirOrFile of dirOrFiles) {
    compiledFiles += await handle(dirOrFile, options);
  }

  return compiledFiles
}

async function handle(filenameOrDir: string, options: Config) {
  if (!fs.existsSync(filenameOrDir)) {
    return 0
  };

  const stat = fs.statSync(filenameOrDir);

  if (stat.isDirectory()) {
    const dirname = filenameOrDir;

    let count = 0;

    const files = readdir(dirname);
    for (const filename of files) {
      const src = path.join(dirname, filename);

      const written = await handleFile(src, dirname, options);
      if (written) count += 1;
    }

    return count;
  } else {
    const filename = filenameOrDir;
    const written = await handleFile(filename, path.dirname(filename), options);

    return written ? 1 : 0;
  }
}





async function handleFile(src: string, base: string, options: Config) {
  await write(src, base, options);
  return true
}

async function write(filename: string, base: string, opts: Config) {
  const { libs = [], extname = 'test.js', outDir } = opts

  const libCodes = await compile(filename, opts)

  const baseName = path.basename(filename, path.extname(filename))
  const dirname = path.join(
    outDir,
  )

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname)
  }


  for (const lib of libs) {
    const testFileName = path.join(
      outDir,
      `${baseName}.${lib}.${extname}`
    )
    console.log('testFileName', libCodes)
    const code = libCodes[lib]
    await writeFile(testFileName, code)
  }

}