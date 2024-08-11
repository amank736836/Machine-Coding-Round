import { useCallback, useEffect, useState } from "react";
import Item from "./Item";
export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  //[{id: time, value: "machine coding round", isCompleted: false}]

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos((prev) => {
        return [
          {
            id: Date.now(),
            value: task.trim(),
            isCompleted: false,
          },
          ...prev,
        ];
      });
      setTask("");
    }
  };

  const handleChange = (e) => {
    setTask(() => {
      return e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleComplete = useCallback((id) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
    });
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleUpdate = useCallback((id, updatedValue) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            value: updatedValue,
          };
        }
        return todo;
      });
    });
  }, []);

  return (
    <div className="todo__container">
      <div className="input">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          style={{
            margin: "10px",
          }}
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>
      <div>
        {todos.map((todo, index) => {
          return (
            <Item
              key={todo.id}
              todo={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}
