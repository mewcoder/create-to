import { promisify } from 'util';
import _figlet from 'figlet';
import chalk from 'chalk'; // 控制台颜色
import readline from 'readline';
import { execa, execaSync } from 'execa';

const figlet = promisify(_figlet);

// 打印
const log = async (msg, color = 'blue', useFig = false) => {
  if (useFig) {
    msg = await figlet(msg);
  }
  console.log(chalk[color](msg));
};

const clear = () => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }
};

const npx = (...args) => {
  // 子进程将使用父进程的标准输入输出
  execaSync('npx', args, { stdio: 'inherit' });
};

export { log, clear, npx };
