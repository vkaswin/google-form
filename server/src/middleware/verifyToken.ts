import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type User = {
  _id: string;
  name: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req?.headers?.authorization?.split(`"`)[1];
    if (!token) return res.status(401).send({ message: "Unauthorized" });
    let decoded = await verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as User;
    next();
  } catch (error: any) {
    console.log(error);
    if (error.message === "jwt expired")
      return res.status(401).send({ message: "Unauthorized" });

    res.status(400).send({ message: "Error" });
  }
};

export default verifyToken;
