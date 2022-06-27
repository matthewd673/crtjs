const scale = 3;

export const canvasSize = {
  width: 240 * scale,
  height: 160 * scale,
}

let context;

export const setContext = (ctx) => context = ctx;

export const Color = {
  Black: '#000000',
  DarkRed: '#7f0622',
  Red: '#d62411',
  Orange: '#ff8426',
  Yellow: '#ffd100',
  White: '#fafdff',
  LightPink: '#ff80a4',
  Pink: '#ff2674',
  LightPurple: '#94216a',
  Purple: '#430067',
  Blue: '#234975',
  LightBlue: '#68aed4',
  LightGreen: '#bfff3c',
  Green: '#10d275',
  Teal: '#007899',
  Navy: '#002859',
}

const tryContext = (ctx) => {
  if (context === null) {
    console.log('No canvas context');
    return false;
  }
  return true;
}

export const set = (color, x, y) => {
  if (!tryContext()) return;

  context.fillStyle = color;
  context.fillRect(x * scale, y * scale, scale, scale);
}

export const run = (code) => {
  
  let tickCt = 0;
  const loop = () => {
    if (tryContext()) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }

    eval(code);

    tickCt++;
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
}