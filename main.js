import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
function render() {

    if (needResize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.width/canvas.height;
        camera.updateProjectionMatrix();
    }
    objects.forEach(object => {
        object.rotation.y += 0.007;
    })
    stats.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function needResize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize)  {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

const objects = [];

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
camera.position.set(0, 1, 3);
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xFFFFFF, 7);
scene.add(light);
const stats = new Stats();
document.body.appendChild(stats.domElement);

const loader = new GLTFLoader();
const url = './resources/models/pony_cartoon.glb';

loader.load(url, (gltf) => {
    const root = gltf.scene;
    root.scale.set(1, 1, 1);
    root.position.y = 0.2;
    objects.push(root);
    scene.add(root);
}) 



render();