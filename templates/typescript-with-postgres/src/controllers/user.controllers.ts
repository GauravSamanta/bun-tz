import { Request, Response } from "express";

export async function loginUser(req: Request, res: Response) {
  res.send(['Hello world']);
}
