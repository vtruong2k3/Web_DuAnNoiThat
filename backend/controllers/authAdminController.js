const User = require("../models/modelUser");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
class authAdminController {
  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const checkMail = await User.findOne({ email });
      if (!checkMail) {
        return res.status(404).json({
          message: "Email không tồn tại",
        });
      }
      const hassPass = await bcryptjs.compare(password, checkMail.password);
      if (!hassPass) {
        return res.status(404).json({
          message: "Sai mật khẩu",
        });
      }
      const token = await jwt.sign(
        {
          id: checkMail._id,
          username: checkMail.username,
          role: checkMail.role,
        },
        process.env.KEY_TOKEN,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        message: "Đăng nhập thành công",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAccount(req, res) {
    try {
      const user = await User.find().sort({ role: -1 });
      if (!user) {
        return res.status(404).json({
          message: "Không có user",
        });
      }
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async addAccount(req, res) {
    try {
      console.log(req.body);
      
      const {username, email, password, address, phone, role}=req.body
      
      const image = req.file ? req.file.filename : null;
      const checkMail=await User.findOne({email})
      if(checkMail){
        return res.status(404).json({
          message:"Email đã tồn tại"
        })
      }
      const hassPass=await bcryptjs.hash(password,10)
      const result=await User.create({
        username,
        email,
        password:hassPass,
        avatar:image,
        address,
        phone,
        role
      })
     
      
      return res.status(200).json({
        message:"Tạo tài khoản thành công",
        result
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = authAdminController;
