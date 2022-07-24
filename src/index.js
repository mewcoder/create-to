import minimist from "minimist";

export function main(argv) {
  const args = minimist(argv.slice(2), {
    boolean: true,
  });

  const willGit = !!args.git;
  const willInstall = !!args.install;

  console.log(willGit, willInstall);
}
