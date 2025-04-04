import * as THREE from 'three';

const images = [
    'deer.jpg',
    'bird1.jpg',
    'sqrl.jpg',
    'bird2.jpg',
    'butterfly.jpg',
    'bird3.jpg'
];

const titles = [
    'Deer Captured',
    'Bird Moments One',
    'Squirell Captured',
    'Bird Moments Two',
    'Butterfly Capturd',
    'Bird Moments Three',
]

const artist = [
    'nick-fewing',
    'nick-fewing',
    'martin-bennie',
    'doncoombenz',
    'david-clode',
    'david-clode',
]

const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const rootNode = new THREE.Object3D();
scene.add(rootNode)

let count = 6;
for (let i = 0; i < count; i++) {

    const texture = textureLoader.load(images[i]);
    texture.colorSpace = THREE.SRGBColorSpace;

    const baseNode = new THREE.Object3D();
    baseNode.rotation.y = i * (2 * Math.PI / count);
    rootNode.add(baseNode);

    const artwork = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.1),
        new THREE.MeshBasicMaterial({
            map: texture
        })
    );
    artwork.position.z = -4;
    baseNode.add(artwork);
}


function animate() {
    rootNode.rotation.y += 0.002;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})