import mongoose from "mongoose";
import { Category } from "./schema";

const startDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("MongoDB Connected!");

  await initDB();
};

const initDB = async () => {
  const categories = [
    {
      slug: "history",
      name: "History",
    },
    {
      slug: "american",
      name: "American",
    },
    {
      slug: "crime",
      name: "Crime",
    },
    {
      slug: "french",
      name: "French",
    },
    {
      slug: "fiction",
      name: "Fiction",
    },
    {
      slug: "english",
      name: "English",
    },
  ];

  const dbcategories = await Category.exists({});

  if (!dbcategories) {
    await Category.create(categories);
    console.log("Categories initialized!");
  }
};

export default startDB;
