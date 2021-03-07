function transformFile(code, options, filename) {

  console.log('options', options)


  const source = code.toString().split('\n')
  const directives = []

  for (let i = 0; i < source.length; i++) {
    const dir = parse(source[i])

    console.log(dir)

    directives.push(dir)
  }

  const t = transform(directives, options)
  genCode(t, options)
}

function genCode(libCodes, options) {

  console.log('libCodes', libCodes)
}
function transform(directives, options) {
  const { lib } = options

  switch (lib) {
    case 'playwright':

      return transformPlaywright(directives, options)
  }
}


function transformPlaywright(directives, options) {
  const { kernals, baseUrl = 'http://127.0.0.1:7000/' } = options

  const suffixClassName = '-uitest'

  const ps = {}
  for (k of kernals) {

    const sts = []
    for ({ key, param, selector } of directives) {

      switch (key) {
        case 'navigate':
          {
            const t = `
            await page.goto('${baseUrl}/${param}');
            `
            sts.push(t)
            break
          }

        case 'input':
          {
            const name = `.${selector}${suffixClassName}`
            const t = `
            await page.fill('${name}', ${param});
  `
            sts.push(t)
            break
          }
        case 'select':
          {
            const name = `.${selector}${suffixClassName}`
            const t = `
              await page.click('.${name} .zstack-select');
              await page.click('.${name} .ant-select-item:nth-child(${parseInt(param) + 1})');
    `
            sts.push(t)
            break
          }
        case 'list-select':
          {
            const name = `.${selector}${suffixClassName}`
            const t = `
              await page.click('.${name} button');
              await page.click('.ant-drawer-open .ant-radio');
              await page.click('.ant-drawer-open .ant-drawer-footer button:nth-child(1)');
    `
            sts.push(t)
            break
          }
        case 'submit':
          {
            const name = `.${selector}${suffixClassName}`
            const t = `
                await page.click('.submit-uitest');
      `
            sts.push(t)
            break
          }
      }
    }
    const res = ` 
    const { ${k} } = require('playwright');
    (async () => {
      const browser = await ${k}.launch();
     ${sts.join('\n')}
      await browser.close();
    })();`

    ps[k] = res
  }

  return ps
}
function parse(statement) {
  const keys = /(navigate|input|select|click|list-select|textarea|submit)\s*/
  const selector = /\w+(?=:)/
  const params = /\[([\.\d\w\/-]+)\]/


  const [selectorParam] = statement.match(selector) || []
  if (selectorParam) {
    statement = String(statement).substr(selectorParam.length + 1)
  }
  const [_key, key] = statement.match(keys) || []
  if (_key) {
    statement = String(statement).substr(_key.length)
  }
  const [_param, param] = statement.match(params) || []

  if (_param) {
    statement = String(statement).substr(_param.length)
  }

  return {
    key,
    param: param,
    selector: selectorParam
  }

}



export default transformFile