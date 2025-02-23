import { Response, NextFunction, Request } from "express";
import { User } from "../schema";
import { verify } from "jsonwebtoken";

const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret");
  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await User.findById((decoded as { userId: string }).userId);
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  (req as any).user = user;

  next();
};

export { authorize };
