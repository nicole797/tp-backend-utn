import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import IUserTokenPayload from "../interfaces/IUserTokenPayload"

const authMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
  const SECRET_KEY = process.env.JWT_SECRET!
  const header = req.headers.authorization

  if (!header) {
    res.status(401).json({ success: false, error: "El token es requerido" });
    return;
  }

  const token = header.split(" ")[1]

  try {
    const payload = jwt.verify(token, SECRET_KEY) as IUserTokenPayload;
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({ success: false, error: "Token inválido" });
  }
};

export default authMiddleware;