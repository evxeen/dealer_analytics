import puppeteer from "puppeteer";
import { searchBolts } from "./helpers/searchBolts.js";
import { searchNuts } from "./helpers/searchNuts.js";
import { searchNails } from "./helpers/searchNails.js";
import { searchScrews } from "./helpers/searchScrews.js";
import { searchNewScrews } from "./helpers/searchNewScrews.js";
import { searchSelfTapping } from "./helpers/searchSelfTapping.js";
import { searchStuds } from "./helpers/searchStuds.js";

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
  await searchNuts(page);
  await searchNails(page);
  await searchScrews(page);
  await searchNewScrews(page);
  await searchSelfTapping(page);
  await searchStuds(page);

  await browser.close();
})();
