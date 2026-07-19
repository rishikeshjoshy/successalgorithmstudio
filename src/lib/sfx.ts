"use client";

/**
 * UI click SFX: plays /sfx-click.mp3 (Pixabay, "computer mouse click" by
 * Universfield) through WebAudio. The raw bytes are prefetched as soon as
 * this module loads so the first click has no network wait, but the
 * AudioContext itself is only created inside the first pointerdown — a
 * user gesture — to satisfy browser autoplay policy. Each play gets its
 * own BufferSource, so rapid clicks overlap cleanly instead of cutting
 * each other off.
 */

const SFX_URL = "/sfx-click.mp3";
const VOLUME = 0.6;

let ctx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let pendingBytes: Promise<ArrayBuffer> | null = null;

function prefetchBytes(): Promise<ArrayBuffer> {
  pendingBytes ??= fetch(SFX_URL).then((res) => {
    if (!res.ok) throw new Error(`SFX fetch failed: ${res.status}`);
    return res.arrayBuffer();
  });
  return pendingBytes;
}

// Warm the cache on module load (client only — this module is "use client").
if (typeof window !== "undefined") {
  prefetchBytes().catch(() => {
    // Retried lazily from playClick if the eager fetch failed.
    pendingBytes = null;
  });
}

export function playClick() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();

    if (clickBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = clickBuffer;
      const gain = ctx.createGain();
      gain.gain.value = VOLUME;
      source.connect(gain).connect(ctx.destination);
      source.start();
      return;
    }

    // First click: finish decoding, then play so the tap still gets its
    // sound (decode of a 20KB clip is a few ms).
    const audioCtx = ctx;
    prefetchBytes()
      .then((bytes) => audioCtx.decodeAudioData(bytes.slice(0)))
      .then((buffer) => {
        clickBuffer = buffer;
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        const gain = audioCtx.createGain();
        gain.gain.value = VOLUME;
        source.connect(gain).connect(audioCtx.destination);
        source.start();
      })
      .catch(() => {
        pendingBytes = null; // allow retry on the next click
      });
  } catch {
    // Audio is a garnish: never let a blocked/absent AudioContext throw.
  }
}
