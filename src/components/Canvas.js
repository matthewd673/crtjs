import { useEffect, useRef } from 'react';
import { canvasSize, setContext } from '../crt';

const Canvas = (props) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    setContext(context);
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