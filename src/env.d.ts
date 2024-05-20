interface ImportMetaEnv {
	readonly VITE_APP_NAME: string;
	readonly VITE_TIMEOUT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
