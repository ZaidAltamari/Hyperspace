'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
interface CreativeAnimationProps {
	onClose: () => void;
}
const CreativeAnimation: React.FC<CreativeAnimationProps> = ({ onClose }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const meshRef = useRef<THREE.Mesh | null>(null);
	const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const camera = new THREE.PerspectiveCamera(
			27,
			container.clientWidth / container.clientHeight,
			0.1,
			100,
		);
		camera.position.z = 12;
		cameraRef.current = camera;
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xddddddd);
		sceneRef.current = scene;
		scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));
		const spotLight = new THREE.SpotLight(0xffffde, 200);
		spotLight.position.set(3.5, 0, 7);
		scene.add(spotLight);
		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 2048;
		spotLight.shadow.mapSize.height = 2048;
		spotLight.shadow.camera.near = 2;
		spotLight.shadow.camera.far = 15;
		spotLight.shadow.camera.fov = 40;
		spotLight.shadow.bias = -0.005;
		const mapHeight = new THREE.TextureLoader().load(
			'/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg',
		);
		const material = new THREE.MeshPhongMaterial({
			color: 0x9c6e49,
			specular: 0x666666,
			shininess: 25,
			bumpMap: mapHeight,
			bumpScale: 10,
		});
		const loader = new GLTFLoader();
		loader.load(
			'/LeePerrySmith.glb',
			(gltf) => {
				const object = gltf.scene.children[0];
				if (object instanceof THREE.Mesh) {
					const geometry = object.geometry;
					const mesh = new THREE.Mesh(geometry, material);
					mesh.position.y = -0.5;
					mesh.scale.set(1, 1, 1);
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					scene.add(mesh);
					meshRef.current = mesh;
				} else {
					console.error('The loaded GLTF object is not a mesh');
				}
			},
			undefined,
			(error) => {
				console.error('Error loading GLTF model:', error);
			},
		);
		const canvas = document.createElement('canvas');
		container.innerHTML = '';
		container.appendChild(canvas);
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		rendererRef.current = renderer;
		renderer.shadowMap.enabled = true;
		const handleResize = () => {
			if (!rendererRef.current || !cameraRef.current || !container) return;
			const width = container.clientWidth;
			const height = container.offsetHeight;
			rendererRef.current.setSize(width, height);
			cameraRef.current.aspect = width / height;
			cameraRef.current.updateProjectionMatrix();
		};
		handleResize();
		const handleMouseMove = (event: MouseEvent) => {
			mouseRef.current.x =
				(event.clientX - container.clientWidth / 2) * 0.001;
			mouseRef.current.y =
				(event.clientY - container.clientHeight / 2) * 0.001;
		};
		window.addEventListener('resize', handleResize);
		container.addEventListener('mousemove', handleMouseMove);
		const animate = () => {
			requestAnimationFrame(animate);
			if (
				!rendererRef.current ||
				!sceneRef.current ||
				!cameraRef.current ||
				!meshRef.current
			)
				return;
			const targetX = mouseRef.current.x;
			const targetY = mouseRef.current.y;
			meshRef.current.rotation.y +=
				0.05 * (targetX - meshRef.current.rotation.y);
			meshRef.current.rotation.x +=
				0.05 * (targetY - meshRef.current.rotation.x);
			rendererRef.current.render(sceneRef.current, cameraRef.current);
		};
		animate();
		return () => {
			window.removeEventListener('resize', handleResize);
			container.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);
	return (
		<div
			style={{
				position: 'relative',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backdropFilter: 'blur(5px)',
				WebkitBackdropFilter: 'blur(5px)',
				boxSizing: 'border-box',
				boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
				WebkitBoxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
			}}>
			<div ref={containerRef} />
			<button
				className='absolute top-4 right-4 bg-white text-black font-bold py-2 px-4'
				onClick={onClose}>
				X
			</button>
		</div>
	);
};
export default CreativeAnimation;
