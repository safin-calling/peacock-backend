import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscribedCategories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    default: [],
  },
});

type User = mongoose.InferSchemaType<typeof userSchema>;

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);

export { User, Category, type User as UserType };
