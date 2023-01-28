import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import mongoose from "mongoose";
import path from "path";
import notFound from "./middlewares/notFound";
import fileRouter from "./routes/file.route";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL as string);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/v1", fileRouter);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message,
  });
});

app.use(notFound);
const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
