require('./check-versions')()
require('shelljs/global')

const inquirer = require('inquirer')
const chalk = require('chalk')
const package = require('../lib/package.json')
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
  message: `当前版本${package.version}  请输入新的版本号`,
  type: 'input',
  default: ''
}]).then(function (answers) {
  if (!answers.message) {
    console.log(chalk.red(`   发布失败   必须录入新的版本号`))
    return
  }
  package.version = answers.message
  fs.writeFileSync('lib/package.json', JSON.stringify(package, null, 2))
  console.log(chalk.green(`   即将开始发布V${answers.message}...`))
  let build = answers.conform ? 'npm run build-lib &&' : ''
  let cmd = `${build}
  cd lib
  npm publish`

  exec(cmd)

  console.log()
  console.log(chalk.green(`   发布完成   请检查控制台是否有异常`))
  console.log()
})
