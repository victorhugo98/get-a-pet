const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/getapet");
    console.log("Conectou ao mongoose");
  } catch (err) {
    throw new Error(err);
  }
}
main();

module.exports = mongoose;
