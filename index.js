import puppeteer from "puppeteer";
import { searchBolts } from "./searchBolts.js";

export let data = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=900,900`],
    defaultViewport: {
      width: 900,
      height: 900,
    },
  });
  const page = await browser.newPage();
  await page.goto("https://www.mtk-fortuna.ru/catalog");

  await searchBolts(page);

  // await browser.close();
})();
