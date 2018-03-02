require('./check-versions')()
require('shelljs/global')

const inquirer = require('inquirer')
const chalk = require('chalk')
const package = require('../packages/package.json')
const packageMain = require('../package.json')
const fs = require('fs')

inquirer.prompt([{
  name: 'conform',
  message: `是否需要重新构建lib？`,
  type: 'list',
  default: 0,
  choices: [{
    name: '是',
    value: 1
  }, {
    name: '否',
    value: 0
  }]
}, {
  name: 'message',
  message: `当前版本${package.version}  请输入新的版本号(直接回车，当前小版本号+1)`,
  type: 'input',
  default: ''
}]).then(function (answers) {
  if (!answers.message) {
    const arr = package.version.split('.')
    arr[arr.length - 1] = +arr[arr.length - 1] + 1
    package.version = arr.join('.')
    // console.log(chalk.red(`   发布失败   必须录入新的版本号`))
    // return
  } else {
    package.version = answers.message
  }
  fs.writeFileSync('packages/package.json', JSON.stringify(package, null, 2))

  packageMain.version = answers.message
  fs.writeFileSync('package.json', JSON.stringify(packageMain, null, 2))

  console.log(chalk.green(`   即将开始发布V${package.version}...`))
  let build = answers.conform ? 'npm run build-lib &&' : ''
  let cmd = `${build}
  cd packages
  npm publish`

  exec(cmd)

  console.log()
  console.log(chalk.green(`   发布完成   请检查控制台是否有异常`))
  console.log()
})
