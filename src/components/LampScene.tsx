"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  AIM,
  HDRI_URL,
  LAMP_MODEL_SCALE,
  LAMP_MODEL_URL,
  LAMP_MODEL_Y_OFFSET,
  SPOT,
} from "@/lib/constants";
import type { LampSceneState } from "@/lib/lamp-state";

interface LampSceneProps {
  state: LampSceneState;
}

const DUST_COUNT = 110;
const CONE_HEIGHT = 2.3;
const BASE_TILT_X = 0.05;

/**
 * The WebGL layer: a carrom-board style overhead lamp hanging in a dark room,
 * lighting a pool on the floor. Reads LampSceneState every frame; never
 * triggers React renders.
 */
export default function LampScene({ state }: LampSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050402);
    scene.fog = new THREE.FogExp2(0x050402, 0.045);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(0, 1.6, 6.4);
    camera.lookAt(0, 1.15, 0);

    // --- environment (HDRI slot, RoomEnvironment fallback) ---
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = roomTarget.texture;
    scene.environmentIntensity = 0.16;
    if (HDRI_URL) {
      new RGBELoader().load(
        HDRI_URL,
        (texture) => {
          if (disposed) return;
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
        },
        undefined,
        () => console.warn("HDRI failed to load, keeping RoomEnvironment:", HDRI_URL)
      );
    }

    // --- room ---
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(16, 48).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x0c0a07, roughness: 0.93 })
    );
    floor.receiveShadow = true;
    scene.add(floor);

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 16),
      new THREE.MeshStandardMaterial({ color: 0x070503, roughness: 1 })
    );
    wall.position.set(0, 6, -3.6);
    wall.receiveShadow = true;
    scene.add(wall);

    // Carrom-board markings: two faint rings under the light pool.
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x2a1a0d, roughness: 0.8 });
    const outerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.78, 0.83, 64).rotateX(-Math.PI / 2),
      ringMaterial
    );
    outerRing.position.set(0, 0.002, 0.2);
    const innerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.33, 64).rotateX(-Math.PI / 2),
      ringMaterial
    );
    innerRing.position.set(0, 0.002, 0.2);
    scene.add(outerRing, innerRing);

    // A few carrom coins on the board: they catch the light and cast shadows.
    const coinGeometry = new THREE.CylinderGeometry(0.085, 0.085, 0.028, 32);
    const coinSpecs: Array<{ color: number; x: number; z: number }> = [
      { color: 0xd8c49a, x: 0.46, z: 0.58 },
      { color: 0xd8c49a, x: -0.52, z: 0.06 },
      { color: 0x241a12, x: 0.16, z: -0.32 },
      { color: 0x8e2f1f, x: -0.14, z: 0.3 },
    ];
    for (const spec of coinSpecs) {
      const coin = new THREE.Mesh(
        coinGeometry,
        new THREE.MeshPhysicalMaterial({
          color: spec.color,
          roughness: 0.45,
          clearcoat: 0.6,
          clearcoatRoughness: 0.4,
        })
      );
      coin.position.set(spec.x, 0.014, spec.z);
      coin.castShadow = true;
      coin.receiveShadow = true;
      scene.add(coin);
    }

    // --- the lamp ---
    const head = new THREE.Group();
    head.position.set(0, 2.62, 0);
    scene.add(head);

    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 1.0, 8),
      new THREE.MeshStandardMaterial({ color: 0x1a1714, roughness: 0.6 })
    );
    cord.position.set(0, 3.12, 0);
    scene.add(cord);

    // Procedural carrom lamp shell — hidden when a real GLTF model is supplied.
    const shadeShell = new THREE.Group();
    head.add(shadeShell);

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a8378,
      metalness: 0.9,
      roughness: 0.35,
    });
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9924c,
      metalness: 0.95,
      roughness: 0.3,
    });
    // Both shade layers are double-sided: depth testing shows the enamel from
    // outside and the cream reflector (slightly smaller) from underneath.
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x16241b,
      metalness: 0.12,
      roughness: 0.55,
      clearcoat: 0.4,
      clearcoatRoughness: 0.5,
      side: THREE.DoubleSide,
    });
    const innerShadeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3e6cd,
      roughness: 0.85,
      side: THREE.DoubleSide,
      emissive: 0xffd9a0,
      emissiveIntensity: 0,
    });
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff3da,
      emissive: 0xffd9a0,
      emissiveIntensity: 0,
    });

    const shadeProfile = [
      new THREE.Vector2(0.045, 0.06),
      new THREE.Vector2(0.1, 0.045),
      new THREE.Vector2(0.22, -0.02),
      new THREE.Vector2(0.38, -0.13),
      new THREE.Vector2(0.5, -0.26),
      new THREE.Vector2(0.585, -0.4),
      new THREE.Vector2(0.61, -0.5),
    ];
    const shadeGeometry = new THREE.LatheGeometry(shadeProfile, 48);

    const shadeOuter = new THREE.Mesh(shadeGeometry, enamelMaterial);
    shadeOuter.castShadow = true;
    const shadeInner = new THREE.Mesh(shadeGeometry, innerShadeMaterial);
    shadeInner.scale.setScalar(0.97);
    shadeInner.position.y = -0.008;

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.075, 0.12, 24), metalMaterial);
    cap.position.y = 0.1;
    cap.castShadow = true;

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.61, 0.02, 12, 48).rotateX(Math.PI / 2),
      brassMaterial
    );
    rim.position.y = -0.5;
    rim.castShadow = true;

    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 16), bulbMaterial);
    bulb.position.y = -0.32;

    shadeShell.add(shadeOuter, shadeInner, cap, rim, bulb);

    // Optional real lamp model: drops into the head group, replaces the shell.
    if (LAMP_MODEL_URL) {
      new GLTFLoader().load(
        LAMP_MODEL_URL,
        (gltf) => {
          if (disposed) return;
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.castShadow = true;
            }
          });
          gltf.scene.scale.setScalar(LAMP_MODEL_SCALE);
          gltf.scene.position.y = LAMP_MODEL_Y_OFFSET;
          shadeShell.visible = false;
          head.add(gltf.scene);
        },
        undefined,
        () =>
          console.warn("Lamp model failed to load, keeping procedural lamp:", LAMP_MODEL_URL)
      );
    }

    // --- key light: the spotlight inside the lamp head ---
    const spot = new THREE.SpotLight(SPOT.color, 0, 0, SPOT.angle, SPOT.penumbra, SPOT.decay);
    spot.position.set(0, -0.36, 0);
    spot.castShadow = true;
    spot.shadow.mapSize.set(2048, 2048);
    spot.shadow.bias = -0.0004;
    spot.shadow.camera.near = 0.4;
    spot.shadow.camera.far = 12;
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0, -2.98, 0.18);
    head.add(spot, spotTarget);
    spot.target = spotTarget;

    const hemi = new THREE.HemisphereLight(0x342c20, 0x0a0705, 0.35);
    scene.add(hemi);

    // --- visible light cone ---
    const coneUniforms = {
      uOpacity: { value: 0 },
      uColor: { value: new THREE.Color(SPOT.color) },
    };
    const coneMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: coneUniforms,
      vertexShader: /* glsl */ `
        varying float vH;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        void main() {
          vH = uv.y;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        uniform vec3 uColor;
        varying float vH;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          // 1 looking through the middle of the cone, 0 at the silhouette:
          // more "air" in the middle means more visible scattered light.
          float body = pow(abs(dot(viewDir, vWorldNormal)), 1.6);
          float vertical = smoothstep(0.0, 0.45, vH) * (0.35 + 0.65 * vH);
          gl_FragColor = vec4(uColor, uOpacity * body * vertical);
        }
      `,
    });
    const coneGroup = new THREE.Group();
    coneGroup.position.set(0, -0.36, 0);
    coneGroup.rotation.x = Math.atan2(0.18, 2.98);
    const cone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 1.5, CONE_HEIGHT, 48, 1, true),
      coneMaterial
    );
    cone.position.y = -CONE_HEIGHT / 2;
    coneGroup.add(cone);
    head.add(coneGroup);

    // --- dust drifting through the light ---
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustSpeeds = new Float32Array(DUST_COUNT);
    const dustPhases = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = THREE.MathUtils.randFloatSpread(5.2);
      dustPositions[i * 3 + 1] = THREE.MathUtils.randFloat(0.05, 3.2);
      dustPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-2.2, 1.4);
      dustSpeeds[i] = THREE.MathUtils.randFloat(0.02, 0.07);
      dustPhases[i] = Math.random() * Math.PI * 2;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xffd9a0,
      size: 0.02,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    dust.frustumCulled = false;
    scene.add(dust);

    // --- sizing ---
    const setSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = camera.aspect < 0.8 ? 50 : 36;
      camera.updateProjectionMatrix();
    };
    setSize();
    window.addEventListener("resize", setSize);

    // --- render loop ---
    const timer = new THREE.Timer();
    renderer.setAnimationLoop(() => {
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();

      head.rotation.x = BASE_TILT_X + state.aimY * AIM.maxRotX + state.idleSwayX;
      // Positive Z rotation tips the down-firing beam toward -X, so follow
      // the pointer by rotating with aimX directly.
      head.rotation.z = state.aimX * AIM.maxRotZ + state.idleSwayZ;

      const power = state.glow * state.intensityScale;
      spot.intensity = SPOT.intensity * power;
      spot.angle = SPOT.angle * (0.75 + 0.25 * state.coneScale);
      bulbMaterial.emissiveIntensity = 3.2 * power;
      innerShadeMaterial.emissiveIntensity = 0.55 * power;
      coneUniforms.uOpacity.value = 0.16 * power;
      coneGroup.scale.set(state.coneScale, 1, state.coneScale);

      if (!reduced) {
        for (let i = 0; i < DUST_COUNT; i++) {
          dustPositions[i * 3 + 1] += dustSpeeds[i] * dt;
          dustPositions[i * 3] += Math.sin(t * 0.4 + dustPhases[i]) * 0.0006;
          if (dustPositions[i * 3 + 1] > 3.4) {
            dustPositions[i * 3 + 1] = 0.05;
          }
        }
        dustGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", setSize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((material) => material.dispose());
        }
      });
      roomTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
