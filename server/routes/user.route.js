import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

//defining the endpoint and endpoint e request ele kon controller function samlabe --
router.route("/register").post(register); //jokhon /register endpoint ba route e post request asbe tokhon take handle korar jonno user.controller.js e 'register' funtion ta run hobe
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile); //only authentic user ke /profile e jete debo
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;

/*
 Explaination :
 
 1. router.route("/register"):
                The .route() method is used to define multiple HTTP methods (like GET, POST, PUT, etc.) for the same route (/register) in a chainable way.
    Instead of writing separate .get(), .post(), or other method calls, you can chain them together under the same route.
2. post(register):
    This specifies that for a POST request to /register, the register function will handle the request.
    register is a handler function (or middleware) that defines what should happen when a POST request is made to the /register route.
    The register function could, for instance, handle user registration, such as validating the data and storing it in a database.

How it works:
When a client sends a POST request to the /register endpoint, the register function is called.
For example:
URL: http://example.com/register
HTTP Method: POST
Action: register function is executed to process the request.

Why Use .route()?
The .route() method allows you to group all HTTP methods for the same route in one place, making the code cleaner and more organized.
*/