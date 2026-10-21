/**
 * Simple 32-bit FNV-1a string hash generator
 */
function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

/**
 * Mulberry32 PRNG (Pseudo-Random Number Generator)
 * Produces deterministic 32-bit pseudorandom numbers between 0 and 1.
 */
function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic Fisher-Yates shuffle using a seeded PRNG.
 * Guarantees identical order for the same seed, but unique permutations for different seeds.
 * 
 * @param {Array} array - The array to shuffle.
 * @param {string|number} seedStr - The seed string (e.g. sessionId + studentId).
 * @returns {Array} A new shuffled copy of the array.
 */
export function seededShuffle(array, seedStr) {
  if (!Array.isArray(array) || array.length <= 1) {
    return array ? [...array] : [];
  }
  const seed = hashString(String(seedStr || 'default_seed'));
  const random = mulberry32(seed);
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
