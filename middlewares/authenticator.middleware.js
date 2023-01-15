const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "shhhhh");
    if (decoded) {
      const userID = decoded.userID;
      // console.log("Yo");
      // console.log(req.body);
      req.body.userID = userID;
      next();
    } else {
      res.send("LOgin First");
    }
  } else {
    res.send("Please Login again");
  }
};
module.exports = { authenticator };
