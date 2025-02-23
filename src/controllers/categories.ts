import { Category, User } from "../schema";
import { Request, Response } from "express";

export const get_categories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await Category.find({}, { _id: 0, __v: 0 });
  res.status(200).json(categories);
};

export const subscribe_category = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryName } = req.body;

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const user = await User.findById((req as any).user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.subscribedCategories.includes(category._id)) {
      res.status(400).json({ message: "Already subscribed to this category" });
      return;
    }

    user.subscribedCategories.push(category._id);
    await user.save();

    res.status(200).json({ message: "Successfully subscribed to category" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unsubscribe_category = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryName } = req.body;
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }

  const user = await User.findById((req as any).user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!user.subscribedCategories.includes(category._id)) {
    res.status(400).json({ message: "Not subscribed to this category" });
    return;
  }

  user.subscribedCategories = user.subscribedCategories.filter(
    (id) => id.toString() !== category._id.toString()
  );
  await user.save();

  res.status(200).json({ message: "Successfully unsubscribed from category" });
};
