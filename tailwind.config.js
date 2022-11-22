module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'div1': '#3B3D46',
          'div2': '#23242D',
          'main-card': "#24262E",

        },
        height: {
          'card': '327.85px',
          'card-sm': '116.85px',
          'card-header': '1.31px',
        },
      },
    },
    corePlugins: {
      preflight: false
    }
    // plugins: [
    //   require('@tailwindcss/line-clamp'),
    // ],
  }
  