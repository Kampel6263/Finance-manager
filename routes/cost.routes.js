const { Router } = require("express");
const CostShema = require("../models/costs");
const router = Router();

const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const data = await CostShema.find();

    setTimeout(() => {
      res.status(201).json({ message: "Succes", response: data });
    }, 300);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const { name, andrianSum, tanyaSum } = req.body;

    const costs = new CostShema({
      name: name,
      andrianSum: andrianSum,
      tanyaSum: tanyaSum,
    });

    await costs.save();

    res.status(201).json({ message: "Costs saved!" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/edit", auth, async (req, res) => {
  try {
    const { name, andrianSum, tanyaSum, id } = req.body;
    const userSpent =
      req.user.email === "andrian6263@gmail.com"
        ? "andrianSpent"
        : "tanyaSpent";

    await CostShema.findOneAndUpdate(
      { _id: id },
      req.body[userSpent] || req.body[userSpent] === 0
        ? {
            name,
            andrianSum,
            tanyaSum,
            [userSpent]: req.body[userSpent],
          }
        : {
            name,
            andrianSum,
            tanyaSum,
          }
    );
    res.status(201).json({ message: "Costs edited!" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/editSpent", auth, async (req, res) => {
  try {
    const { andrianSpent, tanyaSpent, id } = req.body;

    await CostShema.findOneAndReplace(
      { _id: id },
      {
        andrianSpent,
        tanyaSpent,
      }
    );
    res.status(201).json({ message: "Spent costs edited!" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.delete("/remove", auth, async (req, res) => {
  try {
    const { id } = req.body;
    await CostShema.findByIdAndDelete({ _id: id });
    res.status(201).json({ message: "Costs deleted!" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
