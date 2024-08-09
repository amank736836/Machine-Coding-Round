import { useEffect, useState } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
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

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
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
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="todos">
              <div className="todo">
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.value}
                </span>
              </div>
              <div>
                <span
                  onClick={() => {
                    handleComplete(todo.id);
                  }}
                >
                  ✅
                </span>
                <span
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  ⚔️
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
