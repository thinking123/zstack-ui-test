
import fs from "fs"
import { readdir, compile, writeFile } from './utils'
import path from "path";

export const transform = async (options) => {


  const {
    filenames = [],
    plugins,
    context
  } = options

  let compiledFiles = ''

  for (const filename of options.filenames) {
    compiledFiles += await handle(filename, options);
  }


  // for (let i = 0; i < filenames.length; i++) {

  //   const inputMapContent: Buffer = fs.readFileSync(
  //     path.resolve(path.dirname(options.filename), match[1]),
  //   );
  // }


}

async function handle(filenameOrDir, options) {
  if (!fs.existsSync(filenameOrDir)) {
    return 0
  };

  const stat = fs.statSync(filenameOrDir);

  if (stat.isDirectory()) {
    const dirname = filenameOrDir;

    let count = 0;

    const files = readdir(dirname, false);
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





async function handleFile(src, base, options) {
  const written = await write(src, base, options);
}

async function write(filename, base, opts) {
  const { libs = [], kernals, extname = 'test.js', outdir = './dist' } = opts

  const libCodes = await compile(filename, opts)


  const baseName = path.basename(filename, path.extname(filename))
  const dirname = path.join(
    outdir,
  )

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname)
  }


  for (const lib of libs) {
    const testFileName = path.join(
      outdir,
      `${baseName}.${lib}.${extname}`
    )
    console.log('testFileName', libCodes)
    const code = libCodes[lib]
    await writeFile(testFileName, code)
  }

}