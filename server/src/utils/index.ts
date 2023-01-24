import { Response, Request, NextFunction } from "express";
import { sign } from "jsonwebtoken";

const generateJwtToken = (payload: string | object | Buffer) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

class CustomError extends Error {
  status!: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);
    this.status = status;
  }
}

const asyncHandler = <T>(
  cb: (req: Request, res: Response, next: NextFunction) => T
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ message: error?.message || "Internal Server Error" });
      console.log(error);
    }
  };
};

export { asyncHandler, generateJwtToken, CustomError };
