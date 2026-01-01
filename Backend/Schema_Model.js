let mongoose = require(`mongoose`);

let UsersSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
  },
  { collection: "Users" }
);

let CatogerySchema = new mongoose.Schema(
  {
    type: String,
    name: String,
    custom: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { collection: "Category" }
);

let IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: Number,
    date: Date,
  },
  { collection: `IncomeData` }
);

let ExpenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: Number,
    date: Date,
  },
  { collection: `ExpenceData` }
);

let ExpenceModel = mongoose.model(`ExpenceData`, ExpenceSchema);
let IncomeModel = mongoose.model(`IncomeData`, IncomeSchema);
let CategoryModel = mongoose.model(`Category`, CatogerySchema);
let usersModel = mongoose.model(`Users`, UsersSchema);

module.exports = { usersModel, CategoryModel, ExpenceModel, IncomeModel };
