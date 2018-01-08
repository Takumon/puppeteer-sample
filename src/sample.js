const puppeteer = require('puppeteer');

/**
 * 指定したURlのページのタイトルを取得する.
 *
 * @param {String} url
 * @return 指定したページのタイトル
 */
const getTitle = async url => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(url, {
    timeout: 1000000
  });
  const title = await page.title();
  await browser.close();
  return title;
};



/**
 * 指定したアカウントでRocket.Chatにログインしアカウント画面のクリーンキャプチャーを取得する.
 *
 * @param {String} userId Rocket.ChatのユーザID
 * @param {String} password Rocket.Chatのパスワード
 * @return 指定したアカウントのRocket.Chatアカウント画面スクリーンキャプチャー
 */
const getNekoProfileOfRocketChat = async (userId, password) => {
  console.log('処理開始');
  const address = '10.74.85.64';
  const port = '3001';
  const rocketChatUrl = 'http://' + address + ':' + port;


  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(rocketChatUrl, {
    waitUntil: 'networkidle0',
    timeout: 100000 // = 100sec
  });

  // ユーザ名とパスワードを入力
  const $userName = await page.$('#emailOrUsername');
  const $password = await page.$('#pass');
  await $userName.type(userId);
  await $password.type(password);

  // ログイン
  const $loginBtn = await page.$('button.login');
  await $loginBtn.click();

  // 画面遷移待ち
  await page.waitFor('.sidebar__account-label');

  // アカウント画面に遷移
  const $accountLabel = await page.$('.sidebar__account-label');
  await $accountLabel.click();
  const $accountPopoverItem = await page.$('.rc-popover__item[data-id="account"]');
  await $accountPopoverItem.click()

  // 画面遷移待ち
  await page.waitFor('.sidebar-flex__title');

  // スクリーンキャプチャ取得
  const imageBuffer = await page.screenshot({fullPage: true});

  await browser.close();
  const imageBase64 = imageBuffer.toString('base64');
  return imageBase64;
};

exports.getTitle = getTitle;
exports.getNekoProfileOfRocketChat = getNekoProfileOfRocketChat;
