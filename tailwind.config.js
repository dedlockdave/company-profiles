module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#24C196',
          'div1': '#3B3D46',
          'div2': '#23242D',
          'card1': '#3F85A9',
          'card2': '#4A4E69',
          'card3': '#008A64',
          'demph': '#CBCEEE',
          'demph2': '#A8AABC',
          // 'bg': "#4A4E69",
        },
        boxShadow: {
          'themed': '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
        }
        // height: {
        //   'card': '327.85px',
        //   'card-sm': '116.85px',
        //   'card-header': '1.31px',
        // },
      },
    },
    corePlugins: {
      preflight: false
    }
    // plugins: [
    //   require('@tailwindcss/line-clamp'),
    // ],
  }
  