var iOS = false,
  p = navigator.platform;

if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
  iOS = true;
}
var windowWidth = window.innerWidth,
  windowHeight = window.innerHeight;
var body = document.body,
  html = document.documentElement;

var htmlWidth = Math.max(html.offsetWidth, html.clientWidth);
var htmlHeight = Math.max(html.scrollHeight, html.clientHeight);

var bg, stats;
var camera, scene, renderer, particles, geometry, material = [], i, h, color, sprite = [], size, attributesm, shader;
var mouseX = 0, mouseY = 0;
var frameNum = 0;

var windowHalfX = htmlWidth / 2;
var windowHalfY = htmlHeight / 2;

var r = gcd(windowWidth, windowHeight);
var counter = 0;

var randomColor = Math.floor(Math.random() * 3);

var xNum = Math.max(20, htmlWidth / 150), yNum = Math.max(20, htmlWidth / 150);
xNum = Math.round(xNum);
yNum = Math.round(yNum);

var onMouseTrigger = true;
var onMouseTween;
var continusTween = [];

randColor();
init();
animate();
mouseOver();

function gcd(a, b) {
  return (b == 0) ? a : gcd(b, a % b);
}

function randColor() {
  switch (randomColor) {
    case 0:
      $('#bgGreen').show();
      break;
    case 1:
      $('#bgRed').show();
      break;
    case 2:
      $('#bgBlue').show();
      break;
    default:
      $('#bgGreen').show();
      break;
  }
}

function mouseOver() {
  if (onMouseTrigger == true) {
    $('a').hover(
      function() {
        onMouseTrigger = false;
        TWEEN.removeAll();
        for (i = 0; i < counter; i++) {
          if (i % 2 == 0) {
            var tween = new TWEEN.Tween(material[i]).to({
              rotation: "-" + Math.PI
            }, 1000).easing(TWEEN.Easing.Quintic.Out);
          } else {
            var tween = new TWEEN.Tween(material[i]).to({
              rotation: "+" + Math.PI
            }, 1000).easing(TWEEN.Easing.Quintic.Out);
          }
          if (i >= counter - 1) {
            tween.onComplete(function() {
              onMouseTrigger = true;
            });
          }
          tween.start();
        }
      },
      function() {
        counter = 0;
        for (i = 0; i < xNum; i++) {
          for (j = 0; j < yNum; j++) {
            rotate = Math.random() * 0.2;
            if (i % 2 == 0) {
              continusTween[counter] = new TWEEN.Tween(material[counter]).to({
                rotation: "-" + rotate
              }, 1000).repeat(Infinity).delay(0);
            } else {
              continusTween[counter] = new TWEEN.Tween(material[counter]).to({
                rotation: "+" + rotate
              }, 1000).repeat(Infinity).delay(0);
            }
            continusTween[counter].start();
            counter++;
          }
        }
      }
    );
  }
}

// ---
function init() {
  bg = document.createElement('div');
  bg.id = 'bg';
  document.body.appendChild(bg);
  border = document.createElement('div');
  border.id = 'border';
  document.body.appendChild(border);

  camera = new THREE.PerspectiveCamera(60, htmlWidth / htmlHeight, 1, 2000);
  camera.position.z = 20;
  scene = new THREE.Scene();

  geometry = new THREE.Geometry();
  sprite1 = THREE.ImageUtils.loadTexture("images/circle.png");
  sprite2 = THREE.ImageUtils.loadTexture("images/cross.png");
  sprite3 = THREE.ImageUtils.loadTexture("images/rect.png");
  sprite4 = THREE.ImageUtils.loadTexture("images/tri.png");

  for (var i = 0; i < xNum; i++) {
    for (var j = 0; j < yNum; j++) {
      if ((i + j) % 7 == 0) {
        material[counter] = new THREE.SpriteMaterial({
          map: sprite1,
          rotation: 0,
          transparent: true,
          opacity: 1
        });
      } else if ((i + j) % 3 == 0) {
        material[counter] = new THREE.SpriteMaterial({
          map: sprite2,
          rotation: 0,
          transparent: true,
          opacity: 1
        });
      } else if ((i + j) % 2 == 0) {
        material[counter] = new THREE.SpriteMaterial({
          map: sprite3,
          rotation: 0,
          transparent: true,
          opacity: 1
        });
      } else {
        material[counter] = new THREE.SpriteMaterial({
          map: sprite4,
          rotation: 0,
          transparent: true,
          opacity: 1
        });
      }

      if (iOS) {
        material[counter].blending = THREE.NoBlending;
      }

      var rotate = Math.random() * 0.2;
      var posX, posY;
      var randX = Math.random() * 1 - 0.5;
      var randY = Math.random() * 1 - 0.5;

      posX = -xNum + (i * 2.2 + randX);
      posY = -yNum + (j * 2.2 + randY);

      switch (randomColor) {
        case 0:
          material[counter].color.setHex(0xC2EACC);
          break;
        case 1:
          material[counter].color.setHex(0xf3beaf);
          break;
        case 2:
          material[counter].color.setHex(0xb5c4ef);
          break;
        default:
          material[counter].color.setHex(0xC2EACC);
          break;
      }

      sprite[counter] = new THREE.Sprite(material[counter]);
      sprite[counter].position.x = posX;
      sprite[counter].position.y = posY;
      sprite[counter].scale.x = sprite[counter].scale.y = 0;

      if (i % 2 == 0) {
        continusTween[counter] = new TWEEN.Tween(material[counter]).to({
          rotation: "-" + rotate
        }, 1000).repeat(Infinity).delay(0);
      } else {
        continusTween[counter] = new TWEEN.Tween(material[counter]).to({
          rotation: "+" + rotate
        }, 1000).repeat(Infinity).delay(0);
      }
      continusTween[counter].start();

      if ((i + j) % 5 == 0 || (i + j) % 13 == 0 || Math.random() < 0.4) {} else {
        new TWEEN.Tween(sprite[counter].scale).to({
          x: 1,
          y: 1,
          z: 1
        }, 2000).delay(j * 80).easing(TWEEN.Easing.Back.InOut).start();

      }
      scene.add(sprite[counter]);
      counter++;
    }
  }

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    premultipliedAlpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(htmlWidth, htmlHeight);
  bg.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
  htmlWidth = Math.max(html.offsetWidth, html.clientWidth);
  htmlHeight = Math.max(html.scrollHeight, html.clientHeight);

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = htmlWidth / htmlHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(htmlWidth, htmlHeight);

}

function onDocumentMouseMove(event) {}

function onDocumentTouchStart(event) {}

function onDocumentTouchMove(event) {}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  TWEEN.update();
  for (i = 0; i < counter; i++) {
    sprite[i].position.y += 0.0001 * Math.min(i / 10, 200);
    if (sprite[i].position.y > 20) {
      sprite[i].position.y += -40;
    }
  }
  frameNum++;
  renderer.render(scene, camera);
}
