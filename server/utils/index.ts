import { sign } from "jsonwebtoken";
import puppeteer from "puppeteer";
import path from "path";

const screenShotFormPage = async (formId: string) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "form",
      `${formId}.png`
    );
    const url = `http://localhost:3000/#/form/${formId}/fill`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.screenshot({ path: filePath });
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

const generateJwtToken = (payload: string | object | Buffer) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export { screenShotFormPage, generateJwtToken };
