const router = require("express").Router();
const Image = require("../models/image");
const { upload, resizeImage } = require("../middlewares/uploadImages");

router.get("/getAll", async (req, res) => {
  try {
    const images = await Image.find().sort({ _id: -1 });
    res.json(images);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving images", error: error.message });
  }
});

router.post("/create", upload.array("image"), async (req, res) => {
  try {
    const result = await resizeImage(req.files[0].path);
    const img = await Image.create({
      image: result.url,
    });
    res.send({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating image", error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.send({ message: "Image deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting image", error: error.message });
  }
});

module.exports = router;
