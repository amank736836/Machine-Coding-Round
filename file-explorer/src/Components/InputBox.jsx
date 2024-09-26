import { useState } from "react";

const InputBox = ({ name = "", id, submit, cancel }) => {
  const [input, setInput] = useState(name);
  return (
    <>
      <input
        className="input-box"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <span
        onClick={() => {
          submit(id, input);
          cancel();
        }}
      >
        ✅
      </span>
      <span onClick={cancel}>❌</span>
    </>
  );
};

export default InputBox;
