const puppeteer = require('puppeteer');

/**
 * 指定したURlのページのタイトルを取得する.
 *
 * @param {String} url
 * @return 指定したページのタイトル
 */
const getTitle = async url => {
  const browser = await puppeteer.launch();
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(url);
  const title = await page.title();
  await browser.close();
  return title;
};


exports.getTitle = getTitle;
