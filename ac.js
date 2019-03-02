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
var animDuration = 5;
var leafAnimDuration = 1.5;
var animDurationPart = animDuration / 27; //Leaf number
var leavesTransOrigin = ['0% 50%', '100% 100%', '0% 50%', '80% 0%', '0% 0%', '100% 0%', '50% 0%', '100% 100%', '0% 50%',
    '100% 90%', '50% 100%', '100% 100%', '100% 50%', '30% 0%', '100% 0%', '100% 90%', '0% 0%', '100% 80%', '50% 0%',
    '0% 0%', '100% 50%', '100% 60%', '0% 0%', '80% 20%', '0% 0%', '100% 0%', '10% 10%'
];

var leavesTransOriginS = ['0% 50%', '100% 0%', '0% 50%', '80% 100%', '0% 100%', '100% 100%', '50% 100%', '100% 0%', '0% 50%',
    '100% 10%', '50% 0%', '100% 0%', '100% 50%', '30% 100%', '100% 100%', '100% 10%', '0% 100%', '100% 20%', '50% 100%',
    '0% 100%', '100% 50%', '100% 40%', '0% 100%', '80% 80%', '0% 100%', '100% 100%', '10% 90%'
];

var origMain = document.querySelector('#mainBranch');
var objMain = {
    length: 0,
    pathLength: origMain.getTotalLength()
};

function drawLineMain() {
    origMain.style.strokeDasharray = [objMain.length, objMain.pathLength].join(' ');
}

TweenMax.to(objMain, animDuration, {
    length: objMain.pathLength,
    strokeWidth: 30,
    onUpdate: drawLineMain,
    ease: Sine.easeOut
});

var origShadow = document.querySelector('#shadowBranch');
var objShadow = {
    length: 0,
    pathLength: origShadow.getTotalLength()
};

function drawLineShadow() {
    origShadow.style.strokeDasharray = [objShadow.length, objShadow.pathLength].join(' ');
}

TweenMax.to(objShadow, animDuration, {
    length: objShadow.pathLength,
    strokeWidth: 30,
    onUpdate: drawLineShadow,
    ease: Sine.easeOut
});

for (var i = 0; i < 27; i++) {
    TweenMax.from('#leaf' + (i + 1), Math.random() + leafAnimDuration, {
        scale: 0,
        transformOrigin: leavesTransOrigin[i],
        delay: animDurationPart * i
    });
    TweenMax.from('#leafS' + (i + 1), Math.random() + leafAnimDuration, {
        scale: 0,
        transformOrigin: leavesTransOriginS[i],
        delay: animDurationPart * i
    });
}

var tlFallingleaf = new TimelineMax();
tlFallingleaf.delay(animDuration + leafAnimDuration).
to('#leaf25', .5, {
    rotation: 7,
    ease: Linear.easeInOut
}).
to('#leaf25', .4, {
    rotation: 2,
    ease: Linear.easeInOut
}).
to('#leaf25', .3, {
    rotation: 7,
    ease: Linear.easeInOut
}).
to('#leaf25', .2, {
    rotation: 5,
    ease: Linear.easeInOut
}).
to('#leaf25', 1.5, {
    y: '+=960',
    rotation: 90,
    transformOrigin: '50% 50%',
    ease: Linear.easeOut
}).
to('#leaf25', .5, {
    rotation: 80,
    transformOrigin: '70% 50%',
    ease: Linear.easeNone
}).
to('#leaf25', .3, {
    rotation: 85,
    transformOrigin: '70% 50%',
    ease: Linear.easeNone
});

var tlFallingleafS = new TimelineMax();
tlFallingleafS.delay(animDuration + leafAnimDuration + 1.4).
to('#leafS25', 1.5, {
    y: '-=960',
    rotation: -90,
    transformOrigin: '50% 50%',
    ease: Linear.easeOut
}).
to('#leafS25', .5, {
    rotation: -80,
    transformOrigin: '70% 50%',
    ease: Linear.easeNone
}).
to('#leafS25', .3, {
    rotation: -85,
    transformOrigin: '70% 50%',
    ease: Linear.easeNone
});

var tlShadow = new TimelineMax();
tlShadow.delay(animDuration + leafAnimDuration + 1.4).
staggerFrom('#leafShadow', 1.5, {
    scale: 0,
    transformOrigin: '50% 50%',
    ease: Linear.easeNone
}).
staggerTo('#leafShadow', .5, {
    scale: 1.1,
    transformOrigin: '50% 50%',
    ease: Linear.easeNone
}).
staggerTo('#leafShadow', .3, {
    scale: 1,
    transformOrigin: '50% 50%',
    ease: Linear.easeNone
});

var tlRipple = new TimelineMax();
tlRipple.delay(animDuration + leafAnimDuration + 2.7).
from('#leafRipple', .4, {
    scale: 0,
    transformOrigin: '50% 50%',
    ease: Linear.easeIn
}).
to('#leafRipple', .4, {
    scale: 2,
    opacity: 0,
    ease: Linear.easeOut
});
	list.addEventListener('animationend',function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    if(target.nodeName == 'UL'){
        list.style.animationName = 'none';
        var children = list.getElementsByTagName('li');
        for(var i = 0; i < children.length;i++){
            children[i].style.animationName = 'none';
        }
        setTimeout(function(){
            list.style.animationName = 'rotate';
            var children = list.getElementsByTagName('li');
            for(var i = 0; i < children.length;i++){
                children[i].style.animationName = 'in' + (i+1);
            }        
        },100);        
    }
},false);
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
