import fs from 'fs';
import minimist from 'minimist';
import { log, clear, npx } from './utils.js';
import { execa, execaSync } from 'execa';
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
  await log('create to', 'cyan', true);
  const args = minimist(argv.slice(2), {
    boolean: true
  });
  ctx.willGit = !!args.git;
  ctx.willInstall = !!args.install;
  await ask();
  try {
    await strats[ctx.type](ctx);
  } catch (err) {
    console.log(chalk.red(err));
  }
}

async function ask() {
  try {
    const { name, type } = await inquirer.prompt(promptList);
    ctx.name = name;
    ctx.type = type;
  } catch (err) {
    console.log(chalk.red(err));
  }
}

const strats = {
  empty(ctx) {
    execaSync('mkdir', [ctx.name]);
    execaSync('npm', ['init', '-y'], {
      cwd: `./${ctx.name}`
    });
  },
  vite() {
    npx('create-vite@latest', ctx.name);
  },
  vuecli4() {
    npx('@vue/cli@4', 'create', ctx.name);
  },
  vuecli5() {
    npx('@vue/cli@5', 'create', ctx.name);
  },
  vue2() {
    npx('create-vue@2', ctx.name);
  },
  vue3() {
    npx('create-vue@3', ctx.name);
  },
  cra() {
    npx('create-react-app@latest', ctx.name);
  },
  umi3() {
    execaSync('mkdir', [ctx.name]);
    execaSync('cd', [ctx.name]);
    npx('@umijs/create-umi-app');
  },
  umi4() {
    execaSync('mkdir', [ctx.name]);
    execaSync('cd', [ctx.name]);
    npx('create-umi@latest');
  }
};
