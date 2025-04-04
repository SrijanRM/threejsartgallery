import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/Addons.js'
import { Tween, Easing, update as updateTween } from 'tween';

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

const leftBT = textureLoader.load('left.jpg');
const rightBT = textureLoader.load('right.jpg');

let count = 6;
for (let i = 0; i < count; i++) {

    const texture = textureLoader.load(images[i]);
    texture.colorSpace = THREE.SRGBColorSpace;

    const baseNode = new THREE.Object3D();
    baseNode.rotation.y = i * (2 * Math.PI / count);
    rootNode.add(baseNode);

    const border = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.2, 0.09),
        new THREE.MeshStandardMaterial({ color: 0x202020 })
    )
    border.name = `Border_${i}`;
    border.position.z = -4;
    baseNode.add(border)
    const artwork = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.1),
        new THREE.MeshStandardMaterial({
            map: texture
        })
    );
    artwork.name = `Art_${i}`;
    artwork.position.z = -4;
    baseNode.add(artwork);

    const left = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.01),
        new THREE.MeshStandardMaterial({ map: leftBT })
    )
    left.name = `LeftArrow`;
    left.userData = (i === count - 1) ? 0 : (i + 1);
    left.position.set(-1.9, 0, -4)

    baseNode.add(left)

    const rigth = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.01),
        new THREE.MeshStandardMaterial({ map: rightBT })
    )
    rigth.name = `RightArrow`;
    rigth.userData = (i === 0) ? count - 1 : (i - 1);
    rigth.position.set(1.9, 0, -4)
    baseNode.add(rigth)
}

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.65, 1)
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 0.5, -5);
scene.add(spotlight)
scene.add(spotlight.target)

const mirror = new Reflector(
    new THREE.CircleGeometry(10),
    {
        color: 0x303030,
        textureWidth: window.innerWidth,
        textureHeight: window.innerHeight
    }
)
mirror.position.y = -1.2;
mirror.rotateX(-Math.PI / 2)
scene.add(mirror);

function rotateGallery(direction, newindex) {
    const deltaY = direction * (2 * Math.PI / count);

    new Tween(rootNode.rotation)
        .to({ y: rootNode.rotation.y + deltaY }, 1000) // 1000ms = 1s duration
        .easing(Easing.Quadratic.InOut)
        .start().onStart(() => {
            document.getElementById('title').style.opacity = 0;
            document.getElementById('artist').style.opacity = 0;
        })
        .onComplete(() => {
            document.getElementById('title').innerText = titles[newindex];
            document.getElementById('artist').innerText = artist[newindex];

            document.getElementById('title').style.opacity = 1;
            document.getElementById('artist').style.opacity = 1;
        })
}

function animate() {
    updateTween();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mirror.getRenderTarget().setSize(window.innerWidth, window.innerHeight)
})

window.addEventListener('click', (ev) => {
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(
        (ev.clientX / window.innerWidth) * 2 - 1,
        -(ev.clientY / window.innerHeight) * 2 + 1,
    );
    raycaster.setFromCamera(mouseNDC, camera);

    const intersection = raycaster.intersectObject(rootNode, true);
    if (intersection.length > 0) {
        const obj = intersection[0].object;
        const newindex = obj.userData;
        if (obj.name === 'LeftArrow') {
            rotateGallery(-1, newindex);
        }
        if (obj.name === 'RightArrow') {
            rotateGallery(1, newindex);
        }
    }
})

document.getElementById('title').innerText = titles[0];
document.getElementById('artist').innerText = artist[0];