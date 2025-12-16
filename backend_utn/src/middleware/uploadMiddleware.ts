import multer from "multer"
import path from "node:path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + crypto.randomUUID()
    cb(null, name + path.extname(file.originalname))
  }
})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimetypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (allowedMimetypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);  // acepta el archivo
  } else {
    console.log('Tipo de archivo rechazado:', file.mimetype);
    cb(new Error("Solo se permiten imagenes"));
  }
}

const upload = multer({ storage, fileFilter })

export default upload