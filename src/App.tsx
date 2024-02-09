import "./styles.css";
import { useState } from "react";
import { boxes } from "./boxes.js";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (value: string) => {
    switch (value.toLowerCase()) {
      case "c": {
        setInput("");
        setResult("");
        break;
      }
      case "=": {
        handleOperation();
        break;
      }
      case "enter": {
        handleOperation();
        break;
      }
      default: {
        setInput((prevInput) => prevInput + value);
      }
    }
  };

  const handleOperation = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      setResult("Error");
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInput("enter");
    } else if (["+", "-", "*", "/"].includes(e.key)) {
      if (result !== "" && input === "") {
        setInput(result);
      }
    }
  };

  return (
    <div className="App">
      <h1>Calculator App</h1>
      <h2>{result || "0"}</h2>
      <div className="grid-container">
        <input
          className="input-container"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {boxes.map((box: string, index: number) => (
          <button
            key={index}
            className="grid-item"
            onClick={() => handleInput(box)}
          >
            {box}
          </button>
        ))}
      </div>
    </div>
  );
}
