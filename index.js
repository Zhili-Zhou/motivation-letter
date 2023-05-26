// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry( 8, 1.2, 16, 100 ); 
const material = new THREE.MeshLambertMaterial ({ color: 0x83a78d });
const torus = new THREE.Mesh(geometry, material);



scene.add(torus);
torus.position.z = -5;
torus.position.x = 2;


// Lights

const pointLight = new THREE.PointLight(0xffffff); // yellow light
pointLight.position.set(5, 5, 5);
pointLight.intensity = 0.5;//lower the light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Background

const pinkyTexture = new THREE.TextureLoader().load('./pinky_background.png');
scene.background = pinkyTexture;

// Avatar

const lizzieTexture = new THREE.TextureLoader().load('./lizzie.png');

const lizzie = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: lizzieTexture }));

scene.add(lizzie);

const sonTexture = new THREE.TextureLoader().load('Media.jpg');

const son = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: sonTexture }));

scene.add(son);

// Moon

const moonTexture = new THREE.TextureLoader().load('./moon.png');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 27,5;
moon.position.setX(-10);

lizzie.position.z = -5;
lizzie.position.x = 2;

son.position.z = 35;
son.position.setX(0);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
 
  moon.rotation.y += -0.07;
 

  lizzie.rotation.y += 0.03;
  lizzie.rotation.z += 0.03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  moon.rotation.y += -0.008;

  // controls.update();

  renderer.render(scene, camera);
}

animate();


//FAQs section
const faqHeaders = document.querySelectorAll(".faqs-container .faq-header");

faqHeaders.forEach((header, i) => {
  header.addEventListener("click", () => {
    header.nextElementSibling.classList.toggle("active");

    const open = header.querySelector(".open");
    const close = header.querySelector(".close");

    if (header.nextElementSibling.classList.contains("active")) {
      open.classList.remove("active");
      close.classList.add("active");
    } else {
      open.classList.add("active");
      close.classList.remove("active");
    }
  });
});
