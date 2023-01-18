import { Request as HttpRequest, Response as HttpResponse } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateJwtToken } from "../utils";

const register = async (req: HttpRequest, res: HttpResponse) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).send({ message: "Please add all fields" });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).send({ message: "User already exists" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const login = async (req: HttpRequest, res: HttpResponse) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({ message: "Please add all fields" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not exist" });
    }

    let checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).send({ message: "Wrong Password" });
    }

    res.status(200).send({
      token: generateJwtToken({
        id: user._id,
        name: user.name,
        email: user.email,
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

export { register, login };
