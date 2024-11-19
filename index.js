import puppeteer from "puppeteer";
import { collectData } from "./collectData.js";

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
  await page.goto("https://www.mtk-fortuna.ru/bolty");

  await collectData(page);

  // await browser.close();
})();
