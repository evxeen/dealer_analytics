export const collectData = async (page) => {
  let data = {};

  const elementHandle = await page.evaluateHandle((text) => {
    return [...document.body.querySelectorAll("*")].find(
      (el) => el.textContent.trim() === text,
    );
  }, "Болты с шестигранной головкой ГОСТ Р ИСО 4014 (7798) оцинкованные (РМЗ)");

  const getElement = await page.$$eval(".sub-catalog-item", (elements) => {
    const searchElement = elements[1];

    if (searchElement) {
      const link = searchElement.querySelector("a");
      return link ? link.href : null;
    }
  });

  await page.goto(getElement);

  const matchingRows = await page.$$eval("tbody tr", (rows) => {
    const targetTexts = ["6,0 x 20", "10,0 x 30", "16,0 x 70"];
  });
};
