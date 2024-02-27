const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const { resizeImage, upload } = require("../middlewares/uploadImages");
const confirmplayer = require("../models/confirmedPlayer")

router.post("/createPlayer", upload.array("profile"),async (req, res) => {
  try {
     const result = await resizeImage(req.files[0].path);
   const player = await Player.create({...req.body , profile : result.url});
   res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/getPlayer/:team", async (req, res) => {
  try {
    const { team } = req.params;
    const Players = await Player.find({ team: team });
    res.json(Players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/confirmPlayer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(
      { _id: id },
      { $set: { filled: true } }
    );
    res.json(player)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deleteplayer/:id", async (req, res) => {
  try {
    //console.log(req.params.id);
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Player" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Update an address
// router.put("/update/:id", async (req, res) => {
//   try {
//     const updatedAddress = await Address.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedAddress);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


module.exports = router;
