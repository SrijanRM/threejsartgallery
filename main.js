import * as THREE from 'three';

const images = [
    'deer.jng',
    'bird1.jng',
    'bird2.jng',
    'bird3.jng',
    'sqrl.jng'
];

const titles = [
    'Deer Captured',
    'Bird Moments One',
    'Bird Moments Two',
    'Bird Moments Three',
    'Squirell Captured',
]

const artist = [
    'nick-fewing',
    'nick-fewing',
    'martin-bennie',
    'doncoombenz',
    'david-clode',
]

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

}

window.addEventListener('resize' , ()=>{
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})