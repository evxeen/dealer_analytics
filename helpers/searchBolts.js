import { data } from "../index.js";

export const searchBolts = async (page) => {
  let prices = [];

  // Получаем ссылку на категорию
  const getCategoryLink = await page.$eval(
    'a[href="bolty"]',
    (link) => link.href,
  );

  // Переходим по найденной ссылке
  await page.goto(getCategoryLink);

  // Список ссылок, которые необходимо посетить
  const linkPartialText = [
    "Болты с шестигранной головкой ГОСТ Р ИСО 4014 (7798) оцинкованные (РМЗ)",
    "Болты с шестигранной головкой DIN 931 5.8 оцинкованные (РФ)",
    "Болты с шестигранной головкой 7798 П/Р 5.8 оцинкованные (РМЗ)",
    "Болты с шестигранной головкой DIN 933 5.8 оцинкованные (КНР)",
  ];

  // 1 уровень цикла для обхода всех ссылок с продукцией
  for (let i = 0; i < linkPartialText.length; i++) {
    const linkHref = await page.evaluate((text) => {
      const links = Array.from(document.querySelectorAll("a")); // находим все элемены "а" на странице
      const link = links.find((link) => link.textContent.includes(text)); // выбираем ту которая содержит в себе новый текст

      return link ? link.href : null; // если такая существует - возвращаем ее
    }, linkPartialText[i]);

    await page.goto(linkHref); // переходим на страницу видов продукции по категории

    const targetTexts = ["6,0 x 20", "10,0 x 30", "16,0 x 70"];
    const rows = await page.$$("#contentPlaceHolder_gridDiamList tbody tr");

    for (let x = 0; x < targetTexts.length; x++) {
      for (let j = 1; j < rows.length; j++) {
        const row = rows[j];
        let designation = await row.$eval(
          "td:nth-child(2)",
          (e) => e.innerText,
        );
        let price = await row.$eval("td:last-child", (e) =>
          parseFloat(e.innerText.replace(",", ".")),
        );

        if (targetTexts[x] === designation) {
          prices.push(price);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await page.goBack({ waitUntil: "load" });
  }
  data.push(...prices);
  await page.goBack({ waitUntil: "load" });
};
