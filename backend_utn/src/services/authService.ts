import UserModel from "../model/UserModel";
import IUser  from "../interfaces/IUser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (data: IUser) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await UserModel.create({
    ...data,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return { user, token };
};
