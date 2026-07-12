import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist'
	},
	preview: {
		host: true,
		port: 4321,
		allowedHosts: true
	}
})
