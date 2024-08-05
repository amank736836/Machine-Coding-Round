import { useEffect, useRef, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});
  const handleClose = (id) => {
    setToasts((prevToasts) => {
      return prevToasts.filter((toast) => toast.id !== id);
    });
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
  };
  const handleShow = (message, type, time = 2500) => {
    const id = new Date().getTime();
    setToasts([...toasts, { id, message, type }]);
    timersRef.current[id] = setTimeout(() => {
      handleClose(id);
    }, time);
    console.log(timersRef.current);
    console.log(toasts);
  };

  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).forEach((id) => {
        clearTimeout(timersRef.current[id]);
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => (
          <div className={`toast ${type}`} key={id}>
            <div>
              <span>{message}</span>
              <button onClick={() => handleClose(id)}>X</button>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <button
          onClick={() => handleShow("Success Toast", "success", 6000)}
          className="success"
        >
          Success Toast
        </button>
        <button
          onClick={() => handleShow("Info Toast", "info",4000)}
          className="info"
        >
          Info Toast
        </button>
        <button
          onClick={() => handleShow("Warning Toast", "warning" , 7000)}
          className="warning"
        >
          Warning Toast
        </button>
        <button
          onClick={() => handleShow("Error Toast", "error", 5000)}
          className="error"
        >
          Error Toast
        </button>
      </div>
    </div>
  );
}
