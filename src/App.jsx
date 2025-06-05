import { use, useEffect, useRef, useState } from "react";
import "./App.css";
import Menu from "./Menu";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctxRef.current = ctx;

    
  }, [lineWidth, lineColor, lineOpacity]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  const stopDrawing = (e) => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  return (
    <>
      <div className="App">
        <h1>Painter</h1>
        <div className="draw-area">
          <Menu
            setLineWidth={setLineWidth}
            setLineColor={setLineColor}
            setLineOpacity={setLineOpacity}
          />
          <canvas
            width={"1280px"}
            height={"720px"}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
    </>
  );
}

export default App;
