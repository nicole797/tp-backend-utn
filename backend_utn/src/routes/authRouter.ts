import { Router } from "express"
import rateLimit from "express-rate-limit"
import AuthController from "../controllers/authController"

const authRouter = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: "Demasiados intentos. Intente más tarde."
  }
})

// http://localhost:3000/auth/register
authRouter.post("/register", AuthController.register)
// http://localhost:3000/auth/login
authRouter.post("/login", AuthController.login)

export default authRouter