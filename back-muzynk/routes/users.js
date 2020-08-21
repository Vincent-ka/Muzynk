var express = require('express');
var router = express.Router();
const UserModel = require("./../models/User");
const { populate } = require('./../models/User');

// POST
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await UserModel.create(req.body);
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

// GET
router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find()
    .populate("friendlist");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    .populate("User");
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    res.json(deleteUser);
  } catch (err) {
    next(err)
  }
})

// PATCH
router.patch("/:id", async (req, res, next) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updateUser);
  } catch (err) {
    next(err)
  }
})

module.exports = router;