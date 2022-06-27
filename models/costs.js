const { Schema, model } = require("mongoose");

const CostShema = new Schema({
  name: { type: String, required: true },
  andrianSum: { type: Number, required: true },
  tanyaSum: { type: Number, required: true },
  andrianSpent: { type: Number, default: 0 },
  tanyaSpent: { type: Number, default: 0 },
});

module.exports = model("Cost", CostShema);
