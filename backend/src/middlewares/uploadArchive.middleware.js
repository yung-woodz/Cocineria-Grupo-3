import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/upload/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(/\s+/g, "-");
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("Tamaño del archivo:", file.size);  // Agregar este log
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PNG o JPEG"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: fileFilter
});

const handleFileSizeLimit = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: "El tamaño del archivo excede el límite de 5 MB" });
  } else if (err) {
    res.status(400).json({ message: err.message });
  } else {
    next();
  }
};

export { upload, handleFileSizeLimit };
