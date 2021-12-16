const { By, until, Key } = require('selenium-webdriver')

/**
 * 模拟OA登录
 * @param driver 浏览器驱动
 * @param options
 */
exports.login = async function (driver, options) {
  await driver.get(options.url)
  let userNameInput = await driver.wait(until.elementLocated(By.id('exampleInputName')), 10000)
  console.log('开始输入登录用户名')
  userNameInput.sendKeys(options.userName, Key.ENTER)
  let passwordInput = await driver.wait(until.elementLocated(By.id('inputPassword')), 10000)
  console.log('开始输入登录密码')
  passwordInput.sendKeys(options.password, Key.ENTER)
  let loginBtn = await driver.wait(until.elementLocated(By.id('denglu')), 10000)
  loginBtn.click()

  await driver.wait(until.urlContains('Workshop'), 10000)
  let currentUrl = await driver.getCurrentUrl()
  console.log('已成功登录到首页-' + currentUrl)
}
