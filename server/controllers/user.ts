import bcrypt from "bcryptjs";
import User from "../models/user";
import { asyncHandler, generateJwtToken } from "../utils";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw new Error("Please add all fields");

  let existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("User already exists");

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

  if (!email || !password) throw new Error("Please add all fields");

  let user = await User.findOne({ email });

  if (!user) throw new Error("User not exist");

  let isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) throw new Error("Wrong Password");

  res.status(200).send({
    token: generateJwtToken({
      id: user._id,
      name: user.name,
      email: user.email,
    }),
  });
});

export { register, login };
