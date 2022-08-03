import fs from 'fs';
import minimist from 'minimist';
import { log, clear } from './utils.js';
import { execa } from 'execa';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { promptList } from './constant.js';
const ctx = {
  name: '',
  type: 'empty',
  willGit: false,
  willInstall: false,
  willOpen: false
};

export async function main(argv) {
  clear();
  await log('let create', 'cyan', true);
  const args = minimist(argv.slice(2), {
    boolean: true
  });
  ctx.willGit = !!args.git;
  ctx.willInstall = !!args.install;
  try {
    const { name, type } = await inquirer.prompt(promptList);
    ctx.name = name;
    ctx.type = type;
  } catch (err) {
    console.log(chalk.red(err));
  }

  try {
    await strats[ctx.type](ctx);
  } catch (err) {
    console.log(chalk.red(err));
  }

  //  await execa('vue create test', [],);
  // const res = await execa('ls', []);
  // console.log(res.stdout);
  // execa('npm init', [], {
  //   cwd: './test'
  // }).then((result) => {
  //   console.log(result);
  //   console.log(result.stdout);
  // });
  // if (willGit) {
  //   execa('git',['init'],)
  // }
}

const strats = {
  async empty(ctx) {
    await execa(`mkdir ${ctx.name}`);
    execa('npm init -y', [], {
      cwd: `./${ctx.name}`
    }).then((result) => {
      console.log(result.stdout);
    });
  },
  vuecli4() {
    const subprocess = execa(`vue create ${ctx.name}`);
    subprocess.stdout.pipe(process.stdout);
    subprocess.spawn('')
  },
  vuecli5() {},
  vue2() {
    const subprocess = execa(`npm init vue@2`);
    subprocess.stdout.pipe(process.stdout);
    subprocess.stdin.pipe(process.stdin);
  },
  vue3() {
    const subprocess = execa(`npm init vue@3`);
    subprocess.stdout.pipe(process.stdout);
    subprocess.stdin.pipe(process.stdin);
  }
};
