import { Request, Response } from "express";
import { User } from "../schema";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    res.status(400).json({ message: "Name, email and password are required" });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

  await User.create({ name, email, password: hashedPassword });
  res.status(200).json({ message: "User registered successfully" });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body || {};

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }

  const accessToken = sign(
    { userId: user._id },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: "User logged in successfully", accessToken });
};

export { register, login };
