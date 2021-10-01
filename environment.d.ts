declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PDF4DEV_API_KEY: string;
    }
  }
}

export {};
