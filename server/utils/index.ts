import { Response, Request, NextFunction } from "express";
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

const asyncHandler = <T>(
  cb: (req: Request, res: Response, next: NextFunction) => T
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      res.status(400).send({ message: error?.message || "Error" });
      console.log(error?.message);
      console.log(error?.stack);
      console.log(error?.name);
    }
  };
};

const generateJwtToken = (payload: string | object | Buffer) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export { screenShotFormPage, asyncHandler, generateJwtToken };
