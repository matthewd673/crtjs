/* eslint-disable no-new-func */
const scale = 3;

export const canvasSize = {
  width: 240 * scale,
  height: 160 * scale,
}

let mouseData = { x: 0, y: 0, left: false, middle: false, right: false };
let boundingRect = null;

// let context;

let canvas = {
  context: null,
  width: 240,
  height: 160,
  scale: scale,
  center: {
    x: 120,
    y: 80,
  },
  colorTable: {
    0: '#000000',
    1: '#7f0622',
    2: '#d62411',
    3: '#ff8426',
    4: '#ffd100',
    5: '#fafdff',
    6: '#ff80a4',
    7: '#ff2674',
    8: '#94216a',
    9: '#430067',
    10: '#234975',
    11: '#68aed4',
    12: '#bfff3c',
    13: '#10d275',
    14: '#007899',
    15: '#002859',
  }
}

let abort = true;

export const setContext = (ctx) => canvas.context = ctx;
export const setBoundingRect = (rect) => boundingRect = rect;

export const Color = {
  Black: 0,
  DarkRed: 1,
  Red: 2,
  Orange: 3,
  Yellow: 4,
  White: 5,
  LightPink: 6,
  Pink: 7,
  LightPurple: 8,
  Purple: 9,
  Blue: 10,
  LightBlue: 11,
  LightGreen: 12,
  Green: 13,
  Teal: 14,
  Navy: 15,
}

const tryContext = (canvas) => {
  if (canvas.context === null) {
    console.log('No canvas context');
    return false;
  }
  return true;
}

export const mouseMoveListener = (e) => {
  mouseData.x = (e.clientX - boundingRect.left) / scale;
  mouseData.y = (e.clientY - boundingRect.top) / scale;
}

export const mouseDownListener = (e) => {
  mouseData.left = 0x001 & e.buttons;
  mouseData.right = 0x010 & e.buttons;
  mouseData.middle = 0x100 & e.buttons;
}

export const set = (x, y, color) => {
  canvas.context.fillStyle = canvas.colorTable[color];
  canvas.context.fillRect(
    Math.round(x) * canvas.scale,
    Math.round(y) * canvas.scale,
    canvas.scale,
    canvas.scale
    );
}

export const fill = (color) => {
  canvas.context.fillStyle = canvas.colorTable[color];
  canvas.context.fillRect(0, 0, canvasSize.width, canvasSize.height);
}

export const getMouse = () => {
  return mouseData;
}

export const internalLog = (message) => {
  console.log(message); // temp
}

export const run = (code, logFunction) => {

  abort = false;
  
  const userFunction = new Function(
    'canvas', 'Color', // variables
    'set', 'fill', 'getMouse', // functions
    'document', 'window', // blockers
    'alert', // alternatives
    code
    );

  if (tryContext(canvas)) {
    canvas.context.fillStyle = '#000000';
    canvas.context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  }


  const fn = userFunction(
    canvas, Color,
    set, fill, getMouse,
    null, null,
    logFunction
    );
  
  if (fn === undefined) { // no return statement
    alert('Function is undefined - did you forget a return statement?');
  }
  
  if (fn.init === undefined) { // no init
    // TODO: error handling
  }
  if (fn.loop === undefined) { // no loop
    // TODO: error handling
  }

  fn.init();

  let tickCt = 0;
  const loop = () => {
    fn.loop(tickCt);

    tickCt++;

    if (!abort) window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
}

export const stop = () => {
  abort = true;
}