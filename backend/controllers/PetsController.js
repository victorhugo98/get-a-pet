const Pet = require("../models/Pet");
const getUserByToken = require("../helpers/get-user-by-token");
const mongoose = require("mongoose");

class PetsController {
  static async create(req, res) {
    const { name, weight, age, color } = req.body;
    const available = true;
    const images = req.files;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório." });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória." });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória." });
      return;
    }
    if (!images || !images.length) {
      res.status(422).json({ message: "A imagem é obrigatória." });
      return;
    }

    const user = await getUserByToken(req, res);

    const imagesFileName = images.map((image) => image.filename);

    const pet = new Pet({
      name,
      weight,
      age,
      color,
      available,
      images: imagesFileName,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    try {
      const newPet = await pet.save();
      res.status(200).json({ message: "Pet cadastrado com sucesso.", newPet });
    } catch (error) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const pets = await Pet.find().sort("-createdAt");
      res.status(200).json({ pets });
    } catch (err) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }

  static async getAllUserAdoptions(req, res) {
    const user = await getUserByToken(req, res);

    try {
      const adoptions = await Pet.find({ "adopter._id": user._id });
      res.status(200).json({ adoptions });
    } catch (error) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }

  static async getPet(req, res) {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    try {
      const pet = await Pet.findById(id);
      if (!pet) {
        res.status(404).json({ message: "Pet não encontrado." });
        return;
      }
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }

  static async removePet(req, res) {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    const user = await getUserByToken(req, res);
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    if (user._id.toString() !== pet.user._id.toString()) {
      res.status(422).json({ message: "Você só pode remover seu pet." });
      return;
    }

    await Pet.findByIdAndDelete(id);

    res.status(200).json({ message: "Pet deletado com sucesso!" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;
    const { name, weight, age, color, available } = req.body;
    const images = req.files;
    const user = await getUserByToken(req, res);
    const pet = await Pet.findById(id);

    if (user._id.toString() !== pet.user._id.toString()) {
      res.status(422).json({ message: "Você só pode editar seu pet." });
      return;
    }

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório." });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória." });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória." });
      return;
    }
    if (!images || !images.length) {
      res.status(422).json({ message: "A imagem é obrigatória." });
      return;
    }

    const updatedData = {
      name,
      weight,
      age,
      color,
      available,
      images: images.map((image) => image.filename),
    };

    try {
      await Pet.findByIdAndUpdate(id, updatedData);
      res.status(200).json({ message: "Pet atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }

  static async schedule(req, res) {
    const id = req.params.id;
    const user = await getUserByToken(req, res);
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    if (user._id.toString() === pet.user._id.toString()) {
      res
        .status(422)
        .json({ message: "Você não pode adotar seu próprio pet." });
      return;
    }

    if (pet.adopter && pet.adopter._id.toString() === user._id.toString()) {
      res
        .status(422)
        .json({ message: "Você já agendou uma visita para este pet." });
      return;
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
      phone: user.phone,
    };

    try {
      await Pet.findByIdAndUpdate(id, pet);
      res.status(200).json({
        message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;
    const pet = await Pet.findById(id);
    const user = await getUserByToken(req, res);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    if (user._id.toString() !== pet.user._id.toString()) {
      res.status(422).json({ message: "Erro em processar sua solicitação." });
      return;
    }

    if (pet.available === false) {
      res.status(422).json({ message: "pet já adotado." });
      return;
    }

    try {
      await Pet.findByIdAndUpdate(id, pet);
      res.status(200).json({
        message: `Pet adotado com sucesso!`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Algum erro aconteceu, tente novamente mais tarde",
        error,
      });
    }
  }
}
module.exports = PetsController;
