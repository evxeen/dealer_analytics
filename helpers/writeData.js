import ExcelJS from "exceljs";
import { data } from "../index.js";

export const writeData = async () => {
  const todayData = new Date();
  const day = String(todayData.getDate()).padStart(2, "0");
  const month = String(todayData.getMonth() + 1).padStart(2, "0");
  const year = todayData.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  // Открываем файл
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./data/prices.xlsx");

  const worksheet = workbook.getWorksheet(1); // Первый лист

  // Добавляем дату в третью строку
  const dateCell = worksheet
    .getRow(3)
    .getCell(worksheet.getRow(3).cellCount + 1);
  dateCell.value = formattedDate;

  // Добавляем данные
  for (let i = 0; i < data.length; i++) {
    const row = worksheet.getRow(i + 4); // Начинаем с 4-й строки
    const cell = row.getCell(row.cellCount + 1);
    cell.value = data[i];
  }

  // Сохраняем файл
  await workbook.xlsx.writeFile("./data/prices.xlsx");
};
