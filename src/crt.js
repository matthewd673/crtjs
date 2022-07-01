/* eslint-disable no-new-func */
const scale = 3;

export const canvasSize = {
  width: 240 * scale,
  height: 160 * scale,
}

let mouseData = { x: 0, y: 0, left: false, middle: false, right: false };
let boundingRect = null;

let canvasElement;

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

export const setContext = (element) => {
  canvasElement = element;
  canvas.context = element.getContext('2d');
}
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

let sleepTime = 0;
export const setSleepTime = (ms) => {
  sleepTime = ms;
}

let tick = 0;

let userLoopFn = undefined;
let updateLoop = () => {
  userLoopFn(tick);


  tick++;
  if (!abort) {
    if (sleepTime > 0) {
      console.log(sleepTime);
      setTimeout(updateLoop, sleepTime * 100);
    }
    else {
      window.requestAnimationFrame(updateLoop);
    }
  }
}

export const run = (code, logFunction, useCustomLog, forceCustomLog, hotReload = false) => {
  
  const userFunction = new Function(
    'canvas', 'Color', // variables
    'set', 'fill', 'getMouse', 'print', // functions
    'document', 'window', // blockers
    'alert', // redirects
    code
    );

  if (!hotReload && tryContext(canvas)) { // only clear if not hot-reloading
    canvas.context.fillStyle = '#000000';
    canvas.context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  }

  logFunction = useCustomLog ? logFunction : console.log;
  const alertFunction = forceCustomLog ? logFunction : alert;

  const fn = userFunction(
    canvas, Color,
    set, fill, getMouse, logFunction,
    null, null,
    alertFunction
    );

  if (hotReload && (fn === undefined || fn.loop === undefined)) {
    console.log('fn undef? ', fn === undefined);
  };
  
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

  userLoopFn = fn.loop;

  if (!hotReload) tick = 0;

  if (abort) {
    abort = false;
    window.requestAnimationFrame(updateLoop);
  }
}

export const skipTick = () => {
  window.requestAnimationFrame(updateLoop);
}

export const togglePause = () => {
  abort = !abort;
  if (!abort) {
    window.requestAnimationFrame(updateLoop);
  }
}

export const stop = () => {
  abort = true;
}

export const screenshotCanvas = () => {
  let link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = canvasElement.toDataURL();
  link.click();
}