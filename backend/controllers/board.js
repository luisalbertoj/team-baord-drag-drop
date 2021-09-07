const Board = require("../models/board");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
  });

  const result = await board.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

const listTask = async (req, res) => {
  const board = await Board.find({ userId: req.user._id });
  if (!board || board.length === 0)
    return res.status(400).send("You have no assigned tasks");
  return res.status(200).send({ board });
};

const saveTaskImg = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  let imageUrl = "";
  if (req.files.image) {
    if (req.files.image.type != null) {
      const url = req.protocol + "://" + req.get("host") + "/";
      const serverImg =
        "./uploads/" + moment().unix() + path.extname(req.files.image.path);
      fs.createReadStream(req.files.image.path).pipe(
        fs.createWriteStream(serverImg)
      );
      imageUrl =
        url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
    }
  }

  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: imageUrl,
  });

  const result = await board.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

const updateTask = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send("Incomplete data");

  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    taskStatus: req.body.taskStatus,
  });

  if (!board) return res.status(400).send("Task not found");
  return res.status(200).send({ board });
};

const deleteTask = async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(400).send("Task not found");
  return res.status(200).send({ message: "Task deleted" });
};

module.exports = { saveTask, listTask, updateTask, deleteTask, saveTaskImg };
