"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const BLUE = 0x3c7ef9;
const PALE = 0xdbe8ff;
const DIM  = 0x24406e;

export default function HeroRede({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    camera.position.set(0, 0, 16);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(6, 9, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6f9dff, 0.8);
    rim.position.set(-8, -4, -6);
    scene.add(rim);

    const root = new THREE.Group();
    scene.add(root);
    const parts: THREE.Mesh[] = [];

    const COUNT = 46;
    const RADIUS = 5.4;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      nodes.push(
        new THREE.Vector3(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta)
        )
      );
    }

    const nodeGeo = new THREE.IcosahedronGeometry(0.19, 0);
    const matA = new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.3 });
    const matB = new THREE.MeshStandardMaterial({ color: PALE, roughness: 0.5 });

    nodes.forEach((p, i) => {
      const big = i % 5 === 0;
      const m = new THREE.Mesh(nodeGeo, big ? matB : matA);
      m.position.copy(p);
      m.scale.setScalar(big ? 1.7 : 1);
      root.add(m);
      parts.push(m);
    });

    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < 2.6) pts.push(nodes[i], nodes[j]);

    root.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.45 })
      )
    );

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(RADIUS, 1),
      new THREE.MeshBasicMaterial({ color: DIM, wireframe: true, transparent: true, opacity: 0.35 })
    );
    root.add(shell);

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const w = host.clientWidth || 800;
      const h = host.clientHeight || 520;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 700 ? 52 : 40;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      root.rotation.y = t * 0.12 + pointer.x * 0.45;
      root.rotation.x += (-pointer.y * 0.28 - root.rotation.x) * 0.06;

      parts.forEach((m, i) => {
        const base = i % 5 === 0 ? 1.7 : 1;
        m.scale.setScalar(base * (1 + Math.sin(t * 1.6 + i) * 0.14));
      });
      shell.rotation.y = -t * 0.08;

      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (reducedMotion) return;
      if (entry.isIntersecting) {
        if (!raf) loop();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(host);

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material;
        if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((m) => m.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
