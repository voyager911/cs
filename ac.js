var mu = document.getElementsByClassName("mu");
var buttons = {};
const newDim = '1.2vmin';
const numBlackKeys = 14;
const numWhiteKeys = 20;
var intervals = [];
var running = true;
var isKeyframesSupported;
var w = document.getElementById('w');
var x1 = parseFloat(getComputedStyle(w).getPropertyValue('--zipper-x'));
var toTheRight = true;

function moveZipper() {
  x1 = x1 + (toTheRight ? .5 : -.5);
  w.style.setProperty('--zipper-x', x);
  if (x1 >= 110 || x1 <= 10) {
    toTheRight = !toTheRight; //change direction
    setTimeout(function() {
      requestAnimationFrame(moveZipper);
    }, 3000);
  } else {
    requestAnimationFrame(moveZipper);
  }
}
moveZipper();

//

//check for support of variables in keyframes
setTimeout(function() {
  isKeyframesSupported = getComputedStyle(document.body).getPropertyValue('--test-value').indexOf('1') > -1;
  if (isKeyframesSupported) { //force all browsers to do fallback until  I ahve time to figure out why this check breaks Safari only
    document.documentElement.classList.add('supports-variables-in-keyframes');
  } else {
    //do fallback rAF
    
    startIntervals();
    pressKeys();
  }
  
  
  //Animation Control
  document.getElementById('pauser').addEventListener('click', function(e) {
    if (e.currentTarget.checked) {
      mu.style.setProperty('--squeeze-state', 'running');
      running = true;
      if (!isKeyframesSupported) {
        requestAnimationFrame(pressKeys);
        startIntervals();
      }
    } else {
      mu.style.setProperty('--squeeze-state', 'paused');
      running = false;
      intervals.forEach(function(interval) {
        clearInterval(interval);
      });
    }
  });
}, 500);





function startIntervals() {
  intervals[0] = setInterval(() => { pressButton(1) }, 900);
  intervals[1] = setInterval(() => { pressButton(4) }, 1200);
  intervals[2] = setInterval(() => { pressButton(7) }, 1600);
  intervals[3] = setInterval(() => { pressButton(8) }, 1700);
}

function pressButton(index) {
  requestAnimationFrame(function() {
    var enabled = !!buttons[index]; 
    mu.style.setProperty('--button'+index+'-dim', enabled ? newDim : 'var(--button-dim)');
    mu.style.setProperty('--button'+index+'-color', enabled ? 'var(--color1alt)' : 'var(--color1)');
    buttons[index] = !enabled;
  });
}

function pressKeys() {
  var now = Date.now();
  var blackKey = Math.ceil((now % 2800) / 200);
  var whiteKey = Math.ceil(((now + 200) % 3000) / 150);
  mu.style.setProperty('--black'+blackKey, 'var(--color2alt)');
  mu.style.setProperty('--black'+((blackKey - 1) || numBlackKeys), 'var(--black)');
  mu.style.setProperty('--white'+whiteKey, 'var(--color1alta)');
  mu.style.setProperty('--white'+((whiteKey - 1) || numWhiteKeys), 'var(--white)');
  //console.log(whiteKey);
  if (running) {
    requestAnimationFrame(pressKeys);
  }
}
