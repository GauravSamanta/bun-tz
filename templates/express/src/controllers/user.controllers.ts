import { Request, Response } from "express";
import { asyncHandler } from "../helpers/asyncHandler";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.json(["Hello User"]);
});
