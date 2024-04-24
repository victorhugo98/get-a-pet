const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const mongoose = require("mongoose");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }
    if (!confirmPassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatória" });
      return;
    }
    if (password !== confirmPassword) {
      res.status(422).json({ message: "As senhas devem coincidir" });
      return;
    }

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      res.status(422).json({ message: "Usuário já cadastrado" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      createUserToken(newUser, req, res);
    } catch (err) {
      res.status(500).json({ message: "Algum erro aconteceu!" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(422).json({ message: "Usuário ou senha incorretos" });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({ message: "Usuário ou senha incorretos" });
      return;
    }
    createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = await getToken(req);
      const decoded = jwt.verify(token, "*9xcas325*0-6");
      const user = await User.findById(decoded.id).select("-password");
      currentUser = user;
    } else currentUser = null;
    res.status(200).json({ currentUser });
  }

  static async getUserById(req, res) {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!id || !isValidId) {
      res.status(402).json({ message: "Usuário não encontrado" });
      return;
    } else {
      const user = await User.findById(id).select("-password");
      res.status(200).json({ user });
    }
  }

  static async edit(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;
    const user = await getUserByToken(req, res);
    console.log(password, confirmPassword);
    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: "As senhas devem coincidir" });
      return;
    }

    const userExists = await User.findOne({ email }).select("-password");

    if (email !== user.email && userExists) {
      res.status(422).json({ message: "Usuário já cadastrado" });
      return;
    }
    if (password !== '' && password === confirmPassword) {
      const passwordHash = await bcrypt.hash(password, 12);
      user.password = passwordHash;
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    if (image) user.image = image;

    try {
      await User.findByIdAndUpdate({ _id: user._id }, { $set: user });
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde.",
        error,
      });
    }
  }
};
