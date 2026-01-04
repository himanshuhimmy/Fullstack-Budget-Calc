require(`./config`);
let express = require(`express`);
let mongoose = require(`mongoose`);
let {
  usersModel,
  CategoryModel,
  ExpenceModel,
  IncomeModel,
} = require(`./Schema_Model`);
let cors = require("cors");

let app = express();
app.use(express.json());
app.use(cors());

// !for users
app.get(`/get/allUsers`, async (req, resp) => {
  let data = await usersModel.find();
  resp.send(data);
});

app.delete(`/delete/user/:id`, async (req, resp) => {
  let data = await usersModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

app.post(`/add/user`, async (req, resp) => {
  let data = new usersModel(req.body);
  let result = data.save();
  resp.send(result);
  console.log(result);
});

app.put(`/editUser/:id`, async (req, resp) => {
  console.log(req.params);
  let data = await usersModel.findByIdAndUpdate(req.params.id, req.body);
  resp.send(data);
});

// ! for Categorys

app.get(`/get/category`, async (req, resp) => {
  let data = await CategoryModel.find({ custom: false });
  resp.send(data);
});

app.get(`/get/userCategory/:id`, async (req, resp) => {
  let data = await CategoryModel.find({ userId: req.params.id });
  resp.send(data);
});

app.post(`/add/category`, async (req, resp) => {
  let data = new CategoryModel(req.body);
  let result = data.save();
  resp.send(result);
});

// ! for IncomeData
app.get(`/get/income/:id`, async (req, resp) => {
  let data = await IncomeModel.find({ userId: req.params.id })
    .populate("userId")
    .populate("categoryId");
  resp.send(data);
});

app.post(`/add/incomeEntry`, async (req, resp) => {
  let data = new IncomeModel(req.body);
  let result = data.save();
  resp.send(result);
});

app.delete(`/delete/incomeEntry/:id`, async (req, resp) => {
  let data = await IncomeModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// ! for ExpenceData
app.get(`/get/expence/:id`, async (req, resp) => {
  let data = await ExpenceModel.find({ userId: req.params.id })
    .populate("userId")
    .populate("categoryId");
  resp.send(data);
});

app.post(`/add/expenceEntry`, async (req, resp) => {
  let data = new ExpenceModel(req.body);
  let result = data.save();
  resp.send(result);
  console.log(result);
});

app.delete(`/delete/expenceEntry/:id`, async (req, resp) => {
  let data = await ExpenceModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

app.listen(3000);
