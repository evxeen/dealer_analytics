import { data } from "./index.js";

export const searchBolts = async (page) => {
  let prices = [];

  // Получаем ссылку на категорию
  const getCategoryLink = await page.$eval(
    'a[href="bolty"]',
    (link) => link.href,
  );

  // Переходим по найденной ссылке
  await page.goto(getCategoryLink);

  const linkPartialText = [
    "Болты с шестигранной головкой ГОСТ Р ИСО 4014 (7798) оцинкованные (РМЗ)",
    "Болты с шестигранной головкой DIN 931 5.8 оцинкованные (РФ)",
    "Болты с шестигранной головкой 7798 П/Р 5.8 оцинкованные (РМЗ)",
    "Болты с шестигранной головкой DIN 933 5.8 оцинкованные (КНР)",
  ];

  for (let i = 0; i < 1; i++) {
    const linkHref = await page.evaluate((text) => {
      const links = Array.from(document.querySelectorAll("a"));
      console.log(links);
      const link = links.find((link) => link.textContent.includes(text));

      return link ? link.href : null;
    }, linkPartialText[i]);

    await page.goto(linkHref);
  }

  // // Получаем из перечня продукции  2 по списку ссылку
  // const getLinks = await page.$$eval(".sub-catalog-item", (elements) => {
  //   const searchElement = elements[1];
  //
  //   if (searchElement) {
  //     const link = searchElement.querySelector("a");
  //     return link ? link.href : null;
  //   }
  // });
  //
  // await page.goto(getLinks);
  //
  // const targetTexts = ["6,0 x 20", "10,0 x 30", "16,0 x 70"];
  // const rows = await page.$$("#contentPlaceHolder_gridDiamList tbody tr");
  //
  // for (let i = 0; i < targetTexts.length; i++) {
  //   for (let j = 1; j < rows.length; j++) {
  //     const row = rows[j];
  //     let designation = await row.$eval("td:nth-child(2)", (e) => e.innerText);
  //     let price = await row.$eval("td:last-child", (e) =>
  //       parseFloat(e.innerText.replace(",", ".")),
  //     );
  //     console.log(targetTexts[i], price);
  //
  //     if (targetTexts[i] === designation) {
  //       prices.push(price);
  //     }
  //   }
  // }
  // data.push(...prices);
  // console.log(data);
};
