const express = require("express");
const cors = require("cors");

const app = express();

//allowing cross origin resource sharing
app.use(cors());

//middlewares
//to parse json data
app.use(express.json());
//to parse url encoded data;
app.use(express.urlencoded({ extended: true }));

const mailerRoutes = require("./src/routes/mailer");
app.use("/comment", mailerRoutes);

const imageRoutes = require("./src/routes/image");
app.use("/image", imageRoutes);

const videoRoutes = require("./src/routes/video");
app.use("/video", videoRoutes);

const scheduleRoutes = require("./src/routes/schedule");
app.use("/schedule", scheduleRoutes);

const teamRoutes = require("./src/routes/team");
app.use("/team", teamRoutes);

const playerRoutes = require("./src/routes/player")
app.use("/player" , playerRoutes)

module.exports = app;
