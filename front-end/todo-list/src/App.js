import logo from "./logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Ir na Pandora",
      description: "20:30 em ponto",
      isCompleted: false,
    },
  ]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getAllTasks").then((res) => {
      console.log(res);
      setTasks(res.data);
    });
  }, []);

  function createTask() {
    if (inputTitle !== "" && inputDescription !== "") {
      let task = {
        title: inputTitle,
        description: inputDescription,
        isCompleted: false,
      };
      axios.post("http://localhost:3001/createTask", task);
      setTasks([...tasks, task]);
    }
    setInputTitle("");
    setInputDescription("");
  }

  function deleteTask(index) {
    axios.post("http://localhost:3001/delete", { index }).then(() => {
      axios.get("http://localhost:3001/getAllTasks").then((res) => {
        console.log(res);
        setTasks([...res.data]);
      });
    });
  }

  function toogleCompleted(i) {
    tasks[i]["isCompleted"] = !tasks[i].isCompleted;
    axios
      .put("http://localhost:3001/updateTask", {
        index: i,
        isCompleted: tasks[i].isCompleted,
      })
      .then(() => setTasks([...tasks]));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>To Do List</p>
      </header>
      <div>
        <input
          style={{ margin: "10px" }}
          placeholder="título"
          value={inputTitle}
          onChange={(event) => setInputTitle(event.target.value)}
        ></input>
        <input
          placeholder="descrição"
          value={inputDescription}
          onChange={(event) => setInputDescription(event.target.value)}
        ></input>
      </div>
      <button style={{ marginBottom: "10px" }} onClick={() => createTask()}>
        Adicionar
      </button>
      {tasks.map((task, i) => {
        return (
          <div
            style={{
              color: task.isCompleted ? "green" : "red",
              border: "1px solid",
              borderColor: "black",
              maxWidth: "300px",
              margin: "auto",
              borderRadius: "7px",
              marginBottom: "5px",
            }}
          >
            <div key={i}>Título: {task.title}</div>
            <div key={i}>Descrição: {task.description}</div>
            <button
              onClick={() => {
                deleteTask(i);
              }}
            >
              deletar
            </button>
            <button
              style={{ margin: "3px" }}
              onClick={() => {
                toogleCompleted(i);
              }}
            >
              {task.isCompleted ? "descompletar" : "completar"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
