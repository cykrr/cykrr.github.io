import { useEffect, useRef } from "react";
import * as THREE from "three";
export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const getRandomProceduralGeometry = () => {
      const choice = Math.floor(Math.random() * 5);
      switch (choice) {
        case 0: // Random Torus Knot
          return new THREE.TorusKnotGeometry(
            0.5, 
            0.15, 
            128, 
            16, 
            Math.floor(Math.random() * 8) + 2, 
            Math.floor(Math.random() * 8) + 3
          );
        case 1: // Random Lathe (Procedural Vase/Cup shape)
          const points = [];
          for (let i = 0; i < 10; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.4) * Math.random() * 0.5 + 0.25, (i - 5) * 0.25));
          }
          return new THREE.LatheGeometry(points, 32);
        case 2: // Random Polyhedron
          return new THREE.IcosahedronGeometry(0.8, Math.floor(Math.random() * 3));
        case 3: // Randomized Box with varied segments
          return new THREE.BoxGeometry(1, 1, 1, Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1);
        case 4: // Oscillating Plane
          const plane = new THREE.PlaneGeometry(2, 2, 48, 48);
          plane.userData = { 
            isOscillating: true,
            centers: Array.from({ length: 3 }, () => ({
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2,
              speed: 2 + Math.random() * 2,
              freq: 4 + Math.random() * 4
            }))
          };
          return plane;
        default:
          return new THREE.OctahedronGeometry(1);
      }
    };

    const randomGeometry = getRandomProceduralGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    material.wireframe = true;
    const mesh = new THREE.Mesh(randomGeometry, material);
    scene.add(mesh);

    camera.position.z = 2.5;

    function animate(time) {
      requestAnimationFrame(animate);
      
      if (mesh.geometry.userData.isOscillating) {
        const t = time * 0.001;
        const pos = mesh.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          let z = 0;
          mesh.geometry.userData.centers.forEach(c => {
            const dist = Math.sqrt((x - c.x) ** 2 + (y - c.y) ** 2);
            z += Math.sin(dist * c.freq - t * c.speed) * 0.12;
          });
          pos.setZ(i, z);
        }
        pos.needsUpdate = true;
      }

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
}
