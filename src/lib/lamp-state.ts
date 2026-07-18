/**
 * Shared mutable state bridging the DOM world (GSAP timelines, pointer
 * controls) and the WebGL world (LampScene's render loop). GSAP tweens these
 * numbers; the scene reads them every frame. No React re-renders involved.
 */
export interface LampSceneState {
  /** Eased, normalized pointer aim, -1..1 on both axes. */
  aimX: number;
  aimY: number;
  /** Idle breathing offsets (radians), driven by GSAP. */
  idleSwayX: number;
  idleSwayZ: number;
  /** One-shot damped pendulum swing on load (radians), decays to 0. */
  swingZ: number;
  /** Subtle light flicker multiplier around 1. */
  glow: number;
  /** Master light power, 0 at boot -> 1 after the switch-on intro. */
  intensityScale: number;
  /** Light cone footprint multiplier (services mode widens it slightly). */
  coneScale: number;
}

export function createLampSceneState(): LampSceneState {
  return {
    aimX: 0,
    aimY: 0,
    idleSwayX: 0,
    idleSwayZ: 0,
    swingZ: 0,
    glow: 1,
    intensityScale: 0,
    coneScale: 1,
  };
}
