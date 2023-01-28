import { NextFunction, Request, Response } from "express";

const notFound = (_req: Request, res: Response, next: NextFunction) => {
  const message = "404 page not found";
  res.status(404).json({ status: 404, error: message });
  next();
};

export default notFound;
