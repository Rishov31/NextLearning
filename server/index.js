import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config({});
  
// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
  
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);     //ekhane userRoute ta user.route.js theke asbe -> "hhtp://localhost:8080/api/vi/user/register" ete kono client hit korlei user.route.js e giye register function run korabe and send response
                                  //app.use("/api/v1/user", userRoute): Mounts the userRoute router on the /api/v1/user path. "/api/v1/user": The base path for all routes defined in userRoute. userRoute: The router module that contains the user-related routes (imported from user.route.js).
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
  
  
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})