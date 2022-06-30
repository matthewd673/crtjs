import { useEffect, useRef } from 'react';
import { canvasSize, mouseMoveListener, mouseDownListener, setBoundingRect, setContext } from '../CRT';

const Canvas = (props) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    setContext(context);
    setBoundingRect(canvas.getBoundingClientRect());
    canvas.addEventListener('mousemove', mouseMoveListener);
    canvas.addEventListener('mousedown', mouseDownListener);
    canvas.addEventListener('mouseup', mouseDownListener);
  });

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      {...props}
      />
  );
}

export default Canvas;