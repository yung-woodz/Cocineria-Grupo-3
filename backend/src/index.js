"use strict";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import session from "express-session";
import passport from "passport";
import multer from "multer";
import express, { json, urlencoded } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http"
import { cookieKey, HOST, PORT } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import { createUsers } from "./config/initialSetup.js";
import { passportJwtSetup } from "./auth/passport.auth.js";

async function setupServer() {
  try {
    const app = express();
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
          origin: "http://146.83.198.35:1408/auth",
      }
    });

    const apiNamespace = io.of("/api");

    apiNamespace.on('connect', (socket) => {
      console.log("Usuario conectado:", socket.id);
    
        socket.on('disconnect', (reason) => {
          console.log("Usuario desconectado:", reason);
        });
      });
  
    app.set('socketio', io);

    app.disable("x-powered-by");

    app.use(
      cors({
        credentials: true,
        origin: true,
      }),
    );

    app.use(
      urlencoded({
        extended: true,
        limit: "1mb",
      }),
    );

    app.use(
      json({
        limit: "1mb",
      }),
    );

    app.use(cookieParser());

    app.use(morgan("dev"));

    app.use('/src/upload', express.static('src/upload'));

    app.use(
      session({
        secret: cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: true,
          sameSite: "strict",
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passportJwtSetup();

    app.use("/api", indexRoutes);

    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en http://${HOST}:${PORT}/api`);
    });

    return { app, io}

  } catch (error) {
    console.log("Error en index.js -> setupServer(), el error es: ", error);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

async function setupAPI() {
  try {
    await connectDB();
    await setupServer();
    await createUsers();
  } catch (error) {
    console.log("Error en index.js -> setupAPI(), el error es: ", error);
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) =>
    console.log("Error en index.js -> setupAPI(), el error es: ", error),
  );
