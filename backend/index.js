const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const port = 5000;

const UserRoutes = require("./routes/UserRoutes");
const PetsRoutes = require("./routes/PetsRoutes");
app.use("/user", UserRoutes);
app.use("/pet", PetsRoutes);

app.use(express.static("public"));

app.listen(port);
