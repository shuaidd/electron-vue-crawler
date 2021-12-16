const { Builder } = require('selenium-webdriver')
let chrome = require('selenium-webdriver/chrome')

exports.initChromeDriver = function () {
  let driverPath = '/Users/shuaidongdong/soft_install/chromedriver/96.0.4664.45/chromedriver'
  let options = new chrome.Options()
  options.addArguments('--start-maximized') // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
  options.addArguments('--disable-popup-blocking')
  options.addArguments('no-sandbox')
  options.addArguments('disable-extensions')
  options.addArguments('no-default-browser-check')

  let service = new chrome.ServiceBuilder(driverPath).build()
  chrome.setDefaultService(service)

  // driver = new Builder().forBrowser('chrome').setChromeOptions(options.headless()).build()
  return new Builder().forBrowser('chrome').setChromeOptions(options).build()
}
