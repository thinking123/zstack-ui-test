
import fs from "fs"
import { readdir, compile } from './utils'
import path from "path";

export const transform = async (options) => {

  console.log('options', options)

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
  if (!fs.existsSync(filenameOrDir)) return 0;

  const stat = fs.statSync(filenameOrDir);

  if (stat.isDirectory()) {
    const dirname = filenameOrDir;

    let count = 0;

    const files = readdir(dirname, false);
    for (const filename of files) {
      const src = path.join(dirname, filename);

      const written = await handleFile(src, dirname, options);
      if (written) count += 1;
      console.log('src:', src)
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

async function write(src, base, opts) {
  const res = await compile(src, opts)
}