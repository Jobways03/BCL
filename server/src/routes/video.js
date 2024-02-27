const router = require("express").Router();
const Video = require("../models/video");

router.get("/getAll", async (req, res) => {
  try {
    const videoIds = await Video.find().sort({ _id: -1 });
    res.json(videoIds);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving videos", error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.send({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating video", error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.send({ message: "Video deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting video", error: error.message });
  }
});

module.exports = router;
