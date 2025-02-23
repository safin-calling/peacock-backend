import { Request, Response } from "express";
import { Category, User } from "../schema";

const get_feed = async (req: Request, res: Response) => {
  const user = await User.findById((req as any).user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (user.subscribedCategories.length === 0) {
    res.status(400).json({ message: "No categories subscribed" });
    return;
  }

  const categories = await Category.find({
    _id: { $in: user.subscribedCategories },
  });

  const feed = await fetch(
    `https://dummyjson.com/posts/search?q=${categories
      .map((c) => c.slug)
      .join(",")}`
  );
  const feedData = await feed.json();
  res.json(feedData);
};

export default get_feed;
