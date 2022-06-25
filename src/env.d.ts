/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORAGE_PREFIX: string;
  readonly VITE_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
