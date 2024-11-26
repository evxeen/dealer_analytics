import { data } from "../index.js";

export const searchSelfTapping = async (page) => {
  let prices = [];

  // Получаем ссылку на категорию
  const getCategoryLink = await page.$eval(
    'a[href="samorezy"]',
    (link) => link.href,
  );

  // Переходим по найденной ссылке
  await page.goto(getCategoryLink);

  // Список ссылок, которые необходимо посетить
  const linkPartialText = [
    "Саморезы по дереву, оксидированные (РМЗ)",
    "Саморезы по дереву, оксидированные (КНР)",
    "Саморезы п/ш остриё, оцинкованные (РМЗ)",
    "Саморезы п/ш остриё, оцинкованные (КНР)",
    "Саморезы п/ш сверло, оцинкованные (РМЗ)",
    "Саморезы п/ш сверло, оцинкованные (КНР)",
  ];

  // 1 уровень цикла для обхода всех ссылок с продукцией
  for (let i = 0; i < linkPartialText.length; i++) {
    const linkHref = await page.evaluate((text) => {
      const links = Array.from(document.querySelectorAll("a")); // находим все элемены "а" на странице
      const link = links.find((link) => link.textContent.includes(text)); // выбираем ту которая содержит в себе новый текст

      return link ? link.href : null; // если такая существует - возвращаем ее
    }, linkPartialText[i]);

    await page.goto(linkHref); // переходим на страницу видов продукции по категории

    const targetTexts = [
      "3,5 x 51",
      "3,5 x 51",
      "4,2 x 13",
      "4,2 x 13",
      "4,2 x 16",
      "4,2 x 16",
    ];
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
