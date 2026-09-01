/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: '#0B2545',      // Logo Dark Navy Blue
                    blue: '#00A8E8',      // Logo Sky Blue
                    green: '#10B981',     // Logo Leaf Green
                    bg: '#F8FAFC',        // Clean Light Gray/Blueish Background
                }
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}