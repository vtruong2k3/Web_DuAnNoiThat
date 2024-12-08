const jwt = require("jsonwebtoken");
const bcryt = require("bcryptjs");
const User = require("../models/modelUser");

class authController {
  async userRegister(req, res) {
    try {
      const { username, email, password } = req.body;
      const checkMail = await User.findOne({ email });
      if (checkMail) {
        return res.status(409).json({
          message: "Email đã được đăng kí !",
        });
      }
      const hassPassword = await bcryt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hassPassword,
      });
      if (!user) {
        return res.status(404).json({
          message: "Đăng kí thất bại",
        });
      }

      res.status(200).json({
        data: user,
        message: "Bạn đã đăng kí thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const checkMail = await User.findOne({ email });
      if (!checkMail) {
        return res.status(409).json({
          message: "Email không tồn tại",
        });
      }
     
      
      const checkPassword = await bcryt.compare(password, checkMail.password);
      if (!checkPassword) {
        return res.status(404).json({
          message: "Sai mật khẩu",
        });
      } else {
        const token = await jwt.sign(
          {
            id: checkMail._id,
            username: checkMail.username,
            email: checkMail.email,
            role: checkMail.role
          },
          process.env.KEY_TOKEN,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          message: "Đăng nhập thành công",
          data: checkMail,
          token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getUser(req, res) {
    try {
      const token = req.headers["authorization"].split(" ")[1]||null;
      if (!token) {
        return res.status(400).json({ message: "Bạn chưa đăng nhập" });
      }
      const decoded = jwt.verify(token, process.env.KEY_TOKEN);
      
      
      return res.status(200).json({
        userData: decoded,
      });
    } catch (error) {
      
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      console.error("Error while processing token:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = authController;
