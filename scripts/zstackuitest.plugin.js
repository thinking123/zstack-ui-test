import path from 'path'

function transformFile(code, options, filename) {


  const source = code.toString().split('\n')
  const directives = []

  for (let i = 0; i < source.length; i++) {
    const dir = parse(source[i])

    directives.push(dir)
  }

  return transform(directives, options)
}


function transform(directives, options) {
  const { libs = [] } = options
  const trfs = {}

  for (const lib of libs) {

    switch (lib) {
      case 'playwright':

        const res = transformPlaywright(directives, options)
        trfs[lib] = res
        break;
    }
  }


  return trfs

}


function transformPlaywright(directives, options) {
  const { kernals, baseUrl = 'http://127.0.0.1:7000' } = options

  const suffixClassName = '-uitest'

  const sts = []
  for (const { key, param, selector } of directives) {

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
          await page.fill('${name} input,${name} textarea', "${param}");
`
          sts.push(t)
          break
        }
      case 'select':
        {
          const name = `.${selector}${suffixClassName}`
          const t = `
            await page.click('${name} .zstack-select');
            await page.click('${name} .ant-select-item:nth-child(${parseInt(param) + 1})');
  `
          sts.push(t)
          break
        }
      case 'list':
        {
          const name = `.${selector}${suffixClassName}`
          const t = `
            await page.click('${name} button');
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

      case 'wait':
        {
          const name = `.${selector}${suffixClassName}`
          const t = `
          await page.waitForTimeout(${param});
      `
          sts.push(t)
          break
        }
      // case 'click':
      //   {
      //     const name = `.${selector}${suffixClassName}`
      //     const t = `
      //           await page.click('button.${selector}');
      // `
      //     sts.push(t)
      //     break
      //   }
    }
  }
  const res = ` 
  const { ${kernals.join(',')} } = require('playwright');
  (async () => {
    const browser = await ${kernals[0]}.launch(
      { headless: false, slowMo: 50 }
    );
    const page = await browser.newPage();
   ${sts.join('')}
  //  await browser.close();
  })();`


  return res
}
function parse(statement) {
  const keys = /(navigate|input|select|click|list|textarea|submit|wait)\s*/
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