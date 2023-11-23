/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_BASE_API_URL: string;
  // more env variables...
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
