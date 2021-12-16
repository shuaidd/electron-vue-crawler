const { By, until } = require('selenium-webdriver')

exports.autoApprove = async function (driver, options) {
  console.log('自动审批的任务地址--' + options.url)
  await driver.get(options.url)
  let agreeBtn = await driver.wait(until.elementLocated(By.css('input[name=btnApply1]')), 10000)
  console.log('点击同意按钮')
  agreeBtn.click()
  console.log('等待确认框')
  // Wait for the alert to be displayed
  await driver.wait(until.alertIsPresent(), 10000)
  // Store the alert in a variable
  let alert = await driver.switchTo().alert()
  console.log('点击确认')
  // Press the accept button
  await alert.accept()
  console.log('审批结束')
}
