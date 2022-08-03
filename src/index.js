import fs from 'fs';
import minimist from 'minimist';
import { log, clear } from './utils.js';
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
  empty(ctx) {
    execaSync('mkdir', [ctx.name]);
    execaSync('npm', ['init', '-y'], {
      cwd: `./${ctx.name}`
    });
  },
  vuecli4() {
    execaSync('npx', ['@vue/cli@4','create', ctx.name], { stdio: 'inherit' });
  },
  vuecli5() {
    execaSync('npx', ['@vue/cli@5', 'create', ctx.name], { stdio: 'inherit' });
  },
  vue2() {
    // 子进程将使用父进程的标准输入输出。
    const ls = execaSync('npm', ['init', 'vue@2'], { stdio: 'inherit' });
  },
  vue3() {
    execaSync('npm', ['init', 'vue@3'], { stdio: 'inherit' });
  },
  vite() {
    execaSync('npm', ['create', 'vite@latest'], { stdio: 'inherit' });
  }
};
