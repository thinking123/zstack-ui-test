import includes from "lodash/includes";
import readdirRecursive from "fs-readdir-recursive";
import path from "path";
import fs from "fs";
import { Config } from './types'


export function readdir(
  dirname: string,
  includeDotfiles?: boolean,
  filter?: (f: string) => boolean,
) {
  return readdirRecursive(dirname, (filename, _index, currentDirectory) => {
    const stat = fs.statSync(path.join(currentDirectory, filename));

    if (stat.isDirectory()) return true;

    return (
      (includeDotfiles || filename[0] !== ".") && (!filter || filter(filename))
    );
  });
}


export function readConfig(
  name: string,
  basedir: string = '.'
) {
  const filepath = path.resolve(basedir, name)
  const content = fs.readFileSync(filepath, "utf8")
  let options: Config;
  try {
    options = JSON.parse(content) as Config;
  } catch (err) {
    err.message = `${filepath}: Error while parsing config - ${err.message}`;
    throw err;
  }

  return options
}

export function readFile(filename): Promise<string> {
  return new Promise((res, rej) => {
    return fs.readFile(filename, "utf8", (err, data: string) => {
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
    return fs.writeFile(filename, data, (err) => {
      if (err) {
        rej(err)
      } else {
        res()
      }

    })
  })
}


export function resolvePlugin(plugin: string): Function {
  const module = require(path.resolve(plugin))

  return module?.__esModule ? module.default || undefined : module;
}
export async function compile(src: string, opts: Config) {
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