/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/ui/**/*.{tsx,ts}"],
  darkMode: ['selector', '.vscode-dark'],
  theme: {
    extend: {
      colors: {
        vscode: {
          background: 'var(--vscode-editor-background)'
        }
      }
    },
  },
  plugins: [],
}

