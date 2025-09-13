declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      SHAREDB_DATABASE_URI: string;
    }
  }
}

export {};
