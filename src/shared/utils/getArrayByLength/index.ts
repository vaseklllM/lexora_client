export function getArrayByLength(length: number): number[] {
  return Array.from({ length }, (_, idx) => idx);
}
