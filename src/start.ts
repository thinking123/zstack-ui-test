
import commander from "commander";
import glob from 'glob'
import { transform } from './transform'
import { readConfig } from './utils'
import { Config } from './types'

const collect = (
  value: any,
  previousValue?: string[],
) => {
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  return previousValue ? previousValue.concat(values) : values;
}

commander.option(
  "-c, --config [config]",
  "config path.",
);

commander.option(
  "-f, --filename [filename]",
  "The filename to use when reading from stdin. This will be used in source-maps, errors etc.",
);


commander.option(
  "-p, --plugins [list]",
  "A comma-separated list of plugin names.",
  collect,
);

commander.option(
  "-l, --libs [list]",
  "libs",
  collect
);

commander.option(
  "-k, --kernals [list]",
  "kernals",
  collect
);


commander.option(
  "-p, --plugins [list]",
  "A comma-separated list of plugin names.",
  collect,
);



commander.option(
  "-d, --out-dir [out]",
  "Compile an input directory of modules into an output directory.",
);


commander.option(
  "-b, --base-url [baseUrl]",
  "baseUrl.",
);

commander.option("-w, --watch", "Recompile files on changes.");


commander.action(() => { });


commander.parse(process.argv);


const errors = [];

const opts = commander.opts();

const filenames: string[] = commander.args.reduce(function (globbed, input) {
  let files = glob.sync(input);
  if (!files.length) files = [input];
  return globbed.concat(files);
}, []);

if (errors.length) {
  errors.forEach(function (e) {
    console.error("  " + e);
  });
  process.exitCode = 2;
} else {


  let options: Config
  if (opts.config) {
    options = readConfig(opts.config)
    transform(options)
  } else {
    options = {
      ...opts,
      files: filenames,
      watch: opts.watch,
      outDir: opts.outDir,
    }
    transform(options)
  }
}


