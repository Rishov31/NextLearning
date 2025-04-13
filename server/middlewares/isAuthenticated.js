//ei file ta as a middleware kaj korbe jemon user ke authenticate korbe mane only authentic user e mane after login user profile dekhte pabe, course dekhte pabe 

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {  //if token is not present--
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY); //if amar kache token thake then we verify it..
    if (!decode) { //jodi token decode na hoy..
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId; //store the userId which i save in time of generateToken..store it in req.id
    next(); //this next() work is when i get request from client in the route-> router.route("/profile").get(isAuthenticated, getUserProfile); then age isAuthenticated check hobe then run the getUserProfile..so mainly next() call 'getUserProfile'
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
