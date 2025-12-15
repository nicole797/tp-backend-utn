import UserModel from "../model/UserModel";
import IUser from "../interfaces/IUser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "./sendEmail";

export const registerUser = async (data: IUser) => {
  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Crear usuario en la base de datos
  const newUserDoc = await UserModel.create({
    ...data,
    password: hashedPassword,
  });

  // Convertir a objeto plano para que TypeScript reconozca las propiedades
  const newUser = newUserDoc.toObject() as IUser;

  // Enviar correo notificando el registro
  try {
    await sendEmail(
      "Nuevo usuario registrado",
      newUser.email,
      `Se ha registrado un nuevo usuario con nombre ${newUser.name}`
    );
  } catch (error) {
    console.error("Error al enviar correo:", (error as Error).message);
  }

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


