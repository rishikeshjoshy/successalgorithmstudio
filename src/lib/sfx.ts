"use client";

/**
 * Tiny synthesized UI click — no audio asset to ship or license. A short
 * triangle-wave pitch drop with an exponential decay reads as a soft
 * mechanical "tick" that fits the lamp room's analog mood.
 *
 * The AudioContext is created lazily on the first pointerdown (a user
 * gesture, so autoplay policy allows it) and reused for every click.
 */

let ctx: AudioContext | null = null;

export function playClick() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();

    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1900, t);
    osc.frequency.exponentialRampToValueAtTime(650, t + 0.07);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  } catch {
    // Audio is a garnish: never let a blocked/absent AudioContext throw.
  }
}
