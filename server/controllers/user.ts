import bcrypt from "bcryptjs";
import User from "../models/user";
import { asyncHandler, generateJwtToken, CustomError } from "../utils";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new CustomError({ message: "Please add all fields", status: 400 });

  let existingUser = await User.findOne({ email });

  if (existingUser)
    throw new CustomError({ message: "User already exists", status: 400 });

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
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomError({ message: "Please add all fields", status: 400 });

  let user = await User.findOne({ email });

  if (!user) throw new CustomError({ message: "User not exist", status: 400 });

  let isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched)
    throw new CustomError({ message: "Wrong Password", status: 400 });

  res.status(200).send({
    token: generateJwtToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    }),
  });
});

export { register, login };
