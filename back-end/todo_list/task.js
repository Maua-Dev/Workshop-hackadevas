const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 3001;
app.use(bodyParser.json());

tasks = [];

task1 = {
  title: "Tomar banho",
  description: "Banho quente",
  isCompleted: false,
};

tasks.push(task1);

app.get("/", (req, res) => {
  res.send("Hello World - GET");
});

app.get("/task1", (req, res) => {
  res.send(task1);
});

app.post("/post", (req, res) => {
  console.log("body is ", req.body);
  res.send("Hello World - POST");
});

app.post("/createTask", (req, res) => {
  console.log("body is ", req.body);

  task = {
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
  };
  tasks.push(task);
  console.log("\n\nTasks List: ");
  console.table(tasks);
  res.send("Task was created! :)");
});

app.post("/createMultiTask", (req, res) => {
  console.log("body is ", req.body);

  req.body.forEach((element) => {
    console.log("element: " + element.title);
    task = {
      title: element.title,
      description: element.description,
      isCompleted: element.isCompleted,
    };
    tasks.push(task);
  });

  console.log("\n\nTasks List: ");
  console.table(tasks);
  res.send("Task was created! :)");
});

app.get("/getTask", (req, res) => {
  console.log("index: " + req.query.index);
  index = req.query.index;
  task = tasks[index];
  res.send(task);
});

app.get("/getAllTasks", (req, res) => {
  res.send(tasks);
});

app.put("/updateTask", (req, res) => {
  index = req.body.index;

  if (req.body.isCompleted !== undefined) {
    tasks[index].isCompleted = req.body.isCompleted;
  }

  if (req.body.title !== undefined) {
    tasks[index].title = req.body.title;
  }

  if (req.body.description !== undefined) {
    tasks[index].description = req.body.description;
  }

  res.send(tasks[index]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/delete", (req, res) => {
  console.log("index:");
  console.table(req.body);

  aux_tasks = [];
  task = {};
  for (let i = 0; i < tasks.length; i++) {
    if (i !== req.body.index) {
      aux_tasks.push(tasks[i]);
    } else {
      task = tasks[i];
    }
  }
  tasks = aux_tasks;

  res.send(task);
});
