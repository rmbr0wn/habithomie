import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Taken from here: https://www.youtube.com/watch?v=mbsmsi7l3r4
// || here: https://www.youtube.com/watch?v=LKlO8vLvUao
function authentication (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const isCustomAuth = token && token.length < 500;  // If > 500, then it is Google OAuth

    if (!token) return res.status(401).json({ message: "Authorization token cannot be null." });

    let decodedData = null;

    if (isCustomAuth) {
      decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.userId = decodedData?.id;
    } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;
    }

    // console.log("Token: ", token);
    // console.log("Decoded: ", decodedData);

    next();
  } catch (error) {
    return res.status(403).send(error);
  }
};

export default authentication;
