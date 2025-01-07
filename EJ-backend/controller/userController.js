const { comparePassword, hashPassword } = require("../helper/userHelper");
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { updateProduct } = require("./productController");
const { Order } = require("../model/orderModel");
const OTP = require("../model/otpModel")
const nodemailer = require('nodemailer');


exports.registerController = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email) {
      return res.send({
        message: "Enter Email",
      });
    }
    if (!password) {
      return res.send({
        message: "Enter Password",
      });
    }
    if (!firstName) {
      return res.send({
        message: "Enter Name",
      });
    }
    if (!lastName) {
      return res.send({
        message: "Enter Name",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(300).send({
        success: false,
        message: "Email Already Registered",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new User({
      firstName,
      email,
      lastName,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register controller",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).send({ message: "Enter Email" });
    }
    if (!password) {
      return res.status(400).send({ message: "Enter Password" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).send({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Check password match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Wrong credentials. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
      expiresIn: "7d", // Optional: Set token expiry
    });

    // Send response
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send({
      success: false,
      message: "Success in getting users",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Users",
      error,
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send({
      success: true,
      message: "Fetched User Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Users",
      error,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      uid,
      description,
      color,
      type,
      bluetoothVersion,
      category,
      discount,
      price,
      stock,
      model,
      screenSize,
      charging,
      battery,
      displayType,
      image,
      quantity,
    } = req.fields;
    const user = await User.find({ _id: id }).select("cart");
    const found = user[0].cart.findIndex((item) => item.name === name);
    if (found > -1) {
      console.log(found);
      const cart = user[0].cart;
      let qty = parseInt(user[0].cart[found].quantity);
      // Number(qty);
      const updatedUser = await User.updateOne(
        { _id: id , "cart.uid": uid},
        { $set: { "cart.$.quantity": qty + 1 } }
      );
      console.log(qty)
      return res.status(201).send({
        success: true,
        message: "Success",
      });
    } else {
      console.log("not found");
      const u = await User.findById(id);
      const updateUser = await User.updateOne(
        { _id: id },
        {
          $push: {
            cart: {
              name,
              uid,
              description,
              color,
              type,
              bluetoothVersion,
              category,
              discount,
              price,
              stock,
              model,
              screenSize,
              charging,
              battery,
              displayType,
              image,
              quantity
            },
          },
        }
      );

      // await u.save();
      return res.status(201).send({
        success: true,
        message: "Created Successfully",
        u,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Creating Cart",
      error,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await User.findById(id).select("cart");
    res.status(200).send({
      success: true,
      message: "Fetched Cart Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Cart",
      error,
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await User.findById(id).select("cart");
    res.status(200).send({
      success: true,
      message: "Fetched Cart Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Cart",
      error,
    });
  }
};

exports.deleteInCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.body;
    const cart = await User.findById(id).select("cart");
    const updatedUser = await User.updateOne(
      { _id: id },
      { $pull: { cart: { uid } } }
    );
    console.log(updatedUser);
    await cart.save();
    res.status(201).send({
      success: true,
      message: "Deleted Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting cart",
      error,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty, uid } = req.body;
    const cart = await User.findById(id).select("cart");
    const updatedUser = await User.updateOne(
      { _id: id, "cart.uid": uid },
      { $set: { "cart.$.quantity": qty } }
    );
    console.log(updatedUser);
    await cart.save();
    res.status(200).send({
      success: true,
      message: "Successfull",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating cart",
      error,
    });
  }
};

exports.resetCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const cart = await User.updateOne({ _id: id }, { $set: { cart: [] } });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Sucessfully empty cart",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Reseting Cart",
      error,
    });
  }
};


const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

exports.requestOTP = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Generate OTP and set expiration time
    const otp = generateOTP();
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP to the database
    await OTP.findOneAndUpdate(
      { email },
      { otp, expires_at: expirationTime },
      { upsert: true, new: true }
    );

    // Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "🔒 YourLibrary: Verify Your Account with OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="background: #4CAF50; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Welcome to YourLibrary</h1>
            <p style="margin: 0; font-size: 1.1em;">Your gateway to infinite knowledge</p>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #4CAF50; text-align: center;">Your OTP Code</h2>
            <p>Hi there,</p>
            <p>Thank you for signing up with <strong>YourLibrary</strong>. To verify your account, please use the One-Time Password (OTP) below:</p>
            <div style="font-size: 2em; font-weight: bold; color: #4CAF50; text-align: center; margin: 20px 0;">
              ${otp}
            </div>
            <p style="text-align: center; font-size: 0.9em; color: #555;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p>If you did not request this OTP, please disregard this email or <a href="mailto:support@yourlibrary.com" style="color: #4CAF50; text-decoration: none;">contact our support team</a>.</p>
          </div>
          <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 0.9em; color: #555;">
            <p>Regards,</p>
            <p>The <strong>YourLibrary</strong> Team</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ message: "OTP sent successfully", otpId: otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  // Validate request body
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find the OTP record in the database
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (otpRecord.expires_at < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update user verification status
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally delete the OTP record after successful verification
    await OTP.deleteOne({ email });

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

