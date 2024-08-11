import { useState, memo } from "react";

export default memo(function Item({
  todo,
  handleComplete,
  handleDelete,
  handleUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(todo.value);

  const handleChange = (e) => {
    setUpdatedValue(() => {
      return e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    });
  };

  console.log("rendering item");
  return (
    <div className="todos">
      <div className="todo">
        <span
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
          }}
        >
          {isEditing ? (
            <input
              className={`${todo.id}`}
              type="text"
              value={updatedValue}
              onChange={(e) => {
                handleChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdate(todo.id, updatedValue);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            todo.value
          )}
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
        {!todo.isCompleted && !isEditing && (
          <span
            onClick={() => {
              setIsEditing(true);
            }}
          >
            📝
          </span>
        )}
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
});
