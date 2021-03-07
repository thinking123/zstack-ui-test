/*
const options = {
  version:'xx',
  engine:'playwright',
  ...otherOptions,
  plugin:[
    pluginforui
  ]
}
const source = import ('./index')
const output = transform(
  source,
  options
)


console.log(output)

---
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto('http://whatsmyuseragent.org/');
  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
---
*/