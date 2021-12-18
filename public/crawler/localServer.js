const { login } = require('./loginOA')
const { initChromeDriver } = require('./initDriver')
const { autoApprove } = require('./autoApprove');
const url = require("url");
const querystring = require("querystring");

(async function () {

  let param = getCommandLineArgs();
  console.log('node js run',param)
  if (!param.jobUrl) {
    console.log('审批地址不能为空')
    return ;
  }

  if (!param.loginUrl) {
    console.log('登录地址不能为空')
    return ;
  }

  let driver = null
  try {
    driver = initChromeDriver()

    await login(driver, {
      url: param.loginUrl,
      userName: param.userName,
      password: param.password
    })

    let arg = url.parse(param.jobUrl).query;
    let params = querystring.parse(arg);
    console.log(params.jobId)

    await autoApprove(driver, {
      url: param.jobUrl.replace('#','?')
    })
  } finally {
    if (driver) {
      await driver.quit()
    }
  }

  function getCommandLineArgs () {
    let params = {}
    let args = global.process.argv.splice(2)
    console.log('命令行参数--' + args)
    args.forEach(item => {
      let arrays = item.split('==')
      params[arrays[0]] = arrays[1]
    })

    return params;
  }
})()
