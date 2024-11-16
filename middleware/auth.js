const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token){
//     console.log("token",token);
//     console.log("access not allowed");
//      return res.status(401).json({ error: "Access denied" });}

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     console.log(token,"HI",process.env.JWT_SECRET);
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

module.exports = (req, res, next) => {
  console.log('Cookies:', req.cookies); // Debugging cookies
  const token = req.cookies.jwt;
  if (!token) {
    console.log("Access denied - No token");
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(400).json({ error: "Invalid token" });
  }
};

