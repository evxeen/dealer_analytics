import { data } from "../index.js";

export const searchScrews = async (page) => {
  let prices = [];

  const getCategoryLink = await page.$eval(
    'a[href="vinty"]',
    (link) => link.href,
  );

  await page.goto(getCategoryLink);

  const linkPartialText = [
    "Винты с полукруглой головкой ГОСТ 17473 оцинкованные",
  ];

  const targetTexts = ["4,0 x 08"];

  // 1 уровень цикла для обхода всех ссылок с продукцией
  for (let i = 0; i < linkPartialText.length; i++) {
    const linkHref = await page.evaluate((text) => {
      const links = Array.from(document.querySelectorAll("a")); // находим все элемены "а" на странице
      const link = links.find((link) => link.textContent.includes(text)); // выбираем ту которая содержит в себе новый текст

      return link ? link.href : null; // если такая существует - возвращаем ее
    }, linkPartialText[i]);

    await page.goto(linkHref); // переходим на страницу видов продукции по категории

    const rows = await page.$$("#contentPlaceHolder_gridDiamList tbody tr");

    for (let j = 1; j < rows.length; j++) {
      const row = rows[j];
      let designation = await row.$eval("td:nth-child(2)", (e) => e.innerText);
      let price = await row.$eval("td:last-child", (e) =>
        parseFloat(e.innerText.replace(",", ".")),
      );

      if (targetTexts[i] === designation) {
        prices.push(price);
      }
    }
    await page.goBack({ waitUntil: "load" });
  }
  data.push(...prices);
  await page.goBack({ waitUntil: "load" });
};
