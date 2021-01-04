module.exports = {
  theme: {
    screens: {
      s: '375px',
      sm: '500px',
      m: '768px',
      l: '1024px',
      xl: '1280px',
      zzl: '1440px',
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    colors: {
      blue: {
        main: '#3671cd',
        alt: '#1f447e',
        light: '#b3c9ec',
        dark: '#102d5c',
        darker: '#0e274f',
        bg: '#14356b',
      },
      yellow: '#fbd088',
      red: '#d62b31',
      white: '#ffffff',
      black: '#000000',
    },
    extend: {
      zIndex: {
        n1: '-1',
        1: '1',
        3: '3',
      },
      minHeight: {
        header: '4rem',
      },
      outline: {
        a11y: '1px solid',
      },
      boxShadow: {
        nav: '0 10px 22px -6px rgba(0,0,0,.8)',
      },
      spacing: {
        '16/9': '56.25%',
        '22/9': '40.90%',
      },
    },
  },
}
