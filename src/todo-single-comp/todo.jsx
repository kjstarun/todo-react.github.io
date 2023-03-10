import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [newTask, setNewTask] = useState("");
  function addTask() {
    if (!task) {
      return alert("Your task filed is empty, please enter a valid task");
    } else {
      setTaskList((oldData) => {
        return [{ id: uuidv4(), task: task }, ...oldData];
      });
      setTask("");
    }
  }
  const deleteTask = (index) => {
    setTaskList(() => {
      return taskList.filter((item) => item.id !== index);
    });
  };
  const updateTask = (item) => {
    setNewTask("");
    setUpdateId(item.id);
  };
  const submitTask = (id) => {
    setTaskList((old) => {
      old.map((item) => {
        if (item.id === id) {
          return (item.task = newTask);
        } else {
          return item;
        }
      });
      return old;
    });
    setUpdateId(null);
    setNewTask("");
  };

  return (
    <>
      <input
        type="text"
        name="task"
        value={task}
        placeholder="Enter the task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <h1>My tasks are as follows.</h1>
      <ol>
        {taskList.map((item, index) => {
          return (
            <>
              <li key={index}>{item.task}</li>
              <button onClick={(e) => deleteTask(item.id)}>Delete task</button>
              <button onClick={(e) => updateTask(item)}>Update task</button>
              {updateId === item.id ? (
                <>
                  <input
                    type="text"
                    value={newTask}
                    placeholder="Enter new task"
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <button onClick={() => submitTask(item.id)}>Submit</button>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </ol>
    </>
  );
};
export default Todo;
