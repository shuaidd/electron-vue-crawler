console.log("node js run")
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  //  var service = new chrome.ServiceBuilder('/Users/shuaidongdong/soft_install/chromedriver/chromedriver').build();
    let driver = new Builder().forBrowser('chrome').setChromeOptions({binary: '/Users/shuaidongdong/soft_install/chromedriver/96.0.4664.45/chromedriver'}).build();
    try {
        // Navigate to Url
        await driver.get('https://www.google.com');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

        let firstResult = await driver.wait(until.elementLocated(By.css('h3')), 10000);

        console.log(await firstResult.getAttribute('textContent'));
    }
    finally{
        await driver.quit();
    }
})();
