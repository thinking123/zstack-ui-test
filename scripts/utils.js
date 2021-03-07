import includes from "lodash/includes";
import readdirRecursive from "fs-readdir-recursive";
import path from "path";
import fs from "fs";


// class PluginContext {
//   constructor(file, options) {
//     this.file = file;
//     this.opts = options || {};
//   }
// }

export function readdir(
  dirname,
  includeDotfiles,
  filter,
) {
  return readdirRecursive(dirname, (filename, _index, currentDirectory) => {
    const stat = fs.statSync(path.join(currentDirectory, filename));

    if (stat.isDirectory()) return true;

    return (
      (includeDotfiles || filename[0] !== ".") && (!filter || filter(filename))
    );
  });
}

export function readFile(filename) {
  return new Promise((res, rej) => {
    return fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(data)
      }

    })
  })
}

export function writeFile(filename, data) {
  return new Promise((res, rej) => {
    return fs.writeFile(filename, data, (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(data)
      }

    })
  })
}


export function resolvePlugin(plugin) {
  const module = require(path.resolve(plugin))

  return module?.__esModule ? module.default || undefined : module;
}
export async function compile(src, opts) {
  const {
    plugins = []
  } = opts
  const source = await readFile(src)


  let res = ''
  for (const plugin of plugins) {

    const fn = resolvePlugin(plugin)

    res = fn(res ? res : source, opts, src)

  }


  return res
}