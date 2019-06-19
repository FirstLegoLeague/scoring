const fs = require('fs')
const path = require('path')
const caporal = require('caporal')
const Promise = require('bluebird')
const changeCase = require('change-case')
const mkdirp = Promise.promisify(require('mkdirp'))

Promise.promisifyAll(fs)

function generateComponent ({ componentPath }, { inject }) {
  const componentName = path.basename(componentPath)
  const dirPath = path.join(__dirname, '..', 'client', 'components', componentPath)
  console.log(`Creating component in ${dirPath}`)
  return mkdirp(dirPath)
    .then(() => Promise.all([
      fs.writeFile(path.join(dirPath, `${componentName}.html`), '', () => { }),
      fs.writeFile(path.join(dirPath, `${componentName}.js`), getComponentFileContent(componentName), () => { }),
      fs.writeFile(path.join(dirPath, `${componentName}_controller.js`), getControllerFileContent(componentName, inject), () => { }),
      fs.writeFile(path.join(dirPath, `${componentName}.css`), '', () => { })
    ]))
}

function getComponentFileContent (componentName) {
  const camelCaseComponentName = changeCase.camelCase(componentName)
  return `import template from './${componentName}.html'
import './${componentName}.css'

export default {
  template,
  controller: '${camelCaseComponentName}Controller as ${camelCaseComponentName}'
}
`
}

function getControllerFileContent (componentName, injections = []) {
  const pascalCaseComponentName = changeCase.pascalCase(componentName)
  return `class ${pascalCaseComponentName}Controller {
  constructor (${injections.join(', ')}) {
    ${injections.length > 0 ? `Object.assign(this, { ${injections.join(', ')} })` : ''}
  }
}

${pascalCaseComponentName}Controller.$$ngIsClass = true
${pascalCaseComponentName}Controller.$inject = [${injections.map(injection => `'${injection}'`).join(', ')}]

export default ${pascalCaseComponentName}Controller
`
}

caporal
  .name('generate')
  .version('v1')
  .description('Generate components')
  .argument('<componentPath>', 'Path to component directory')
  .option('--inject <injections>', 'Dependencies to inject to the controller', caporal.LIST, [])
  .action((args, options) => {
    generateComponent(args, options)
      .catch(err => {
        console.error(err.message)
        process.exitCode = 1
      })
  })

// Make global options
const defaultCmd = caporal._commands[0]
for (const cmd of caporal._commands.slice(1)) {
  cmd._options.unshift(...defaultCmd._options)
}

caporal.parse(process.argv)
