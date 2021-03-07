
import commander from "commander";
// const commander = require('commander');
// const glob = require("glob");
import glob from 'glob'
// const { transform } = require('./transform')
import { transform } from './transform'

function collect(
  value,
  previousValue,
) {
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  return previousValue ? previousValue.concat(values) : values;
}

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

commander.option("-w, --watch", "Recompile files on changes.");


commander.action(() => { });


commander.parse(process.argv);


const errors = [];

const opts = commander.opts();

let filenames = commander.args.reduce(function (globbed, input) {
  let files = glob.sync(input);
  if (!files.length) files = [input];
  return globbed.concat(files);
}, []);



if (commander.outDir && !filenames.length) {
  errors.push("--out-dir requires filenames");
}

if (errors.length) {
  errors.forEach(function (e) {
    console.error("  " + e);
  });
  process.exitCode = 2;
} else {
  const options = {
    ...opts,
    filenames,
    watch: opts.watch,
    outDir: opts.outDir,
    plugins: [
      './scripts/zstackuitest.plugin.js'
    ],
  }



  transform(options)

}


