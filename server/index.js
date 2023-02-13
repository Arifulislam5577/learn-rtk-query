import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/rtkquery", () => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.send("<h1>Learn RTK Query</h1>");
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email, status } = req.body;

    const newUser = await User.create({
      name: name,
      email: email,
      status: status,
    });

    if (newUser) {
      return res.status(201).json({ message: "User created" });
    }
    return res.status(403).json({ message: "Someting went wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch(`/api/users/:id`, async (req, res) => {
  try {
    const update = await User.findById(req.params.id);

    const updateUser = await User.findByIdAndUpdate(update._id, {
      status: !update.status,
    });
    res.status(200).json({ message: "Update success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete(`/api/users/:id`, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
