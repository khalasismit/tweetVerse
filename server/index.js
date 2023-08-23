import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { login, register } from "./controllers/auth.js";
import { createPost, deletePost, getFeedPosts, getUserPosts } from "./controllers/posts.js";
import { getUser, searchUser } from "./controllers/user.js";
import { verifyToken } from "./middleware/verifyToken.js";
/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.post("/auth/register", register);
app.post("/auth/login",login);
app.get("/users/:id",verifyToken,getUser);
app.post("/posts",verifyToken,createPost);
app.get("/posts",verifyToken,getFeedPosts);
app.get("/posts/:userId/posts",verifyToken,getUserPosts);
app.get("/posts/:userId/posts/:id",verifyToken,deletePost);
app.get("/:search",verifyToken,searchUser);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));