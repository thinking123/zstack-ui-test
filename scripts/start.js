
// import commander from "commander";
const commander = require('commander');



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
  "--plugins [list]",
  "A comma-separated list of plugin names.",
  collect,
);


commander.option(
  "-o, --out-file [out]",
  "Compile all input files into a single file.",
);

commander.action(() => { });


commander.parse(process.argv);



const opts = commander.opts();


console.log('opts', opts)
console.log('args', commander.args)