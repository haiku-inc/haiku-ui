/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  /** When `"true"`, uses bundled Wasm `mm2d` for forward matmul (see tensorWasmMatmul.ts). */
  readonly VITE_ENABLE_WASM_MM2D?: string;
  /** Ship target: `web` (default, env/.env) or `desktop` (Tauri, env/.env.desktop). See src/platform/capabilities.ts. */
  readonly VITE_BUILD_TARGET?: 'web' | 'desktop';
}
