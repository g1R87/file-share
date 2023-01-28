import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import File from "../models/File";
import { hashPassword, verifyPassword } from "../utils/passwords";

export const getPage = (req: Request, res: Response) => {
  res.render("index");
};

interface FileType {
  path: string | undefined;
  originalName: string | undefined;
  password?: string;
}

export const uploadFile = async (req: Request, res: Response) => {
  const fileData: FileType = {
    path: req.file?.path,
    originalName: req.file?.originalname,
  };

  if (req.body.password != null && req.body.password != "") {
    fileData.password = await hashPassword(req.body.password);
  }

  const file = await File.create(fileData);
  console.log(file);

  res.render("index", {
    fileLink: `${req.headers.origin}/api/v1/file/${file.id}`,
  });
};

export const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) throw createError(404, "File not found");

    if (file.password != null) {
      if (req.body.password == null) {
        res.render("password");
        return;
      }

      if (!(await verifyPassword(req.body.password, file.password))) {
        res.render("password", { error: true });
        return;
      }
    }

    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);
    res.download(file.path, file.originalName);
  } catch (error) {
    next(error);
  }
};
