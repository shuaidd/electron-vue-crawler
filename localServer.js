console.log("node js run")
const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let driver = null;
(async function example() {
    try {
        let options = new chrome.Options();
        options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
        options.addArguments("--disable-popup-blocking");
        options.addArguments("no-sandbox");
        options.addArguments("disable-extensions");
        options.addArguments("no-default-browser-check");

        let service = new chrome.ServiceBuilder('/Users/shuaidongdong/soft_install/chromedriver/96.0.4664.45/chromedriver').build();
        chrome.setDefaultService(service)

        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
        // Navigate to Url
        await driver.get('https://www.google.com');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

        let firstResult = await driver.wait(until.elementLocated(By.css('h3')), 10000);

        console.log(await firstResult.getAttribute('textContent'));
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
})();
