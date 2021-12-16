const { login } = require('./crawler/loginOA')
const { initChromeDriver } = require('./crawler/initDriver')
const { autoApprove } = require('./crawler/autoApprove');

(async function () {
  console.log('node js run')
  let driver = null
  try {
    driver = initChromeDriver()
    await login(driver, {
      url: 'http://kfmy.shinyway.org:8084/',
      userName: 'ddshuai',
      password: '1'
    })

    await autoApprove(driver, {
      url: 'http://kfmy.shinyway.org:8084/apply/specialCommonSealApply.jsp?jobId=20211209000023'
    })
  } finally {
    if (driver) {
      await driver.quit()
    }
  }
})()
