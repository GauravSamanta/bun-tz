import { Request, Response, NextFunction } from "express";

// Define the type of requestHandler
type RequestHandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

// Create the asyncHandler function
const asyncHandler = (requestHandler: RequestHandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
