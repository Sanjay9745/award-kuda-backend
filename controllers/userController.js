const User = require("../model/User");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret";

const register = async (req, res) => {
  try {
    const { name, email, password, address, adhar_card, blood_group, phone } =
      req.body;
    // Validate data
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !adhar_card ||
      !blood_group ||
      !phone
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      address,
      adhar_card,
      blood_group,
      phone,
    });
    await newUser.save();
    // Sign the token
    const token = jwt.sign({ id: newUser._id }, jwtSecret);

    res
      .status(200)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate data
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Check if the password is correct
    if (password !== existingUser.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Sign the token
    const token = jwt.sign({ id: existingUser._id }, jwtSecret);
    res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editUser = async (req, res) => {
  try {
    const { name, email, password, address, adhar_card, blood_group, phone } =
      req.body;
    // Validate data
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Check if the user already exists
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (address) {
      user.address = address;
    }
    if (adhar_card) {
      user.adhar_card = adhar_card;
    }
    if (blood_group) {
      user.blood_group = blood_group;
    }
    if (phone) {
      user.phone = phone;
    }
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
    try {
      const userId = req.userId; // Assuming userId is passed as a parameter
       await User.findOneAndDelete(userId);
      
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  register,
  login,
  editUser,
  deleteUser,
};
