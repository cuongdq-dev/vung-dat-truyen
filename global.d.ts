export {};

declare global {
  interface Window {
    adsbygoogle: unknown[]; // Use `unknown[]` because `adsbygoogle` is an array
  }
}
