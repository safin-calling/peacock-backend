import mongoose from "mongoose";
import { Category } from "./schema";

const startDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("MongoDB Connected!");

  await initDB();
};

const initDB = async () => {
  const categories = [
    { name: "Technology", description: "Technology description" },
    { name: "Science", description: "Science description" },
    { name: "Business", description: "Business description" },
    { name: "Health", description: "Health description" },
    { name: "Entertainment", description: "Entertainment description" },
    { name: "Sports", description: "Sports description" },
  ];
  await Category.create(categories);
  console.log("Categories initialized!");
};

export default startDB;
