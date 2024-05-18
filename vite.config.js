// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into a separate chunk
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit
  },
};
