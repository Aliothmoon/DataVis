import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [{
            find: '@',
            replacement: path.resolve(__dirname, './src')
        }, {
            find: 'public',
            replacement: path.resolve(__dirname, './public')
        }, {
            find: 'assets',
            replacement: path.resolve(__dirname, './src/assets')
        }]
    }
})
