const router = require("express").Router();
const { upload, resizeImage } = require("../middlewares/uploadImages");
const Schedule = require("../models/schedule");
const Team = require("../models/team");

// GET all teams
router.get("/getAll", async (req, res) => {
  try {
    const teams = await Team.find().sort({ _id: -1 });
    res.json(teams);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching teams", error: error.message });
  }
});

// POST create a new team
router.post("/create", upload.array("image"), async (req, res) => {
  try {
    const result = await resizeImage(req.files[0].path);
    const team = await Team.create({
      image: result.url,
      teamName: req.body.teamName,
    });
    res.send({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating team", error: error.message });
  }
});

// PUT update a team by ID
router.put("/teams/:id", async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTeam);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating team", error: error.message });
  }
});

// DELETE a team by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    let teamId = req.params.id;
    const teamInMatches = await Schedule.findOne({
      $or: [{ team1: teamId }, { team2: teamId }],
    });

    if (teamInMatches) {
      res.send({
        message: "Team is included in the matches.so, cannot be deleted",
      });
    } else {
      await Team.findByIdAndDelete(req.params.id);
      res.send({ message: "Team deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting team", error: error.message });
  }
});

module.exports = router;
