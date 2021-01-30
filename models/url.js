const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const urlSchema = new mongoose.Schema(
  {
    url: String,
    short_url: String,
    no_of_visitors: Number,
  },
  { timestamps: true }
);

urlSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Url", urlSchema);
