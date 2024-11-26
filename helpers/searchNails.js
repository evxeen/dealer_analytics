import { data } from "../index.js";

export const searchNails = async (page) => {
  let prices = [];

  const getCategoryLink = await page.$eval(
    'a[href="gvozdi"]',
    (link) => link.href,
  );

  await page.goto(getCategoryLink);

  const linkPartialText = [
    "Гвозди строительные ГОСТ 4028 без покрытия 5 кг",
    "Гвозди винтовые черт 7811-7335 без покрытия 5 кг (РМЗ)",
    "Гвозди ершёные с конической головкой черт 7811-7120 без покрытия 5 кг (РМЗ)",
    "Гвозди финишные черт. 7811-7035 оцинкованные 5 кг",
  ];

  const targetTexts = ["4,0 x 100", "3,0 x 70", "3,1 x 70", "1,8 x 40"];

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
