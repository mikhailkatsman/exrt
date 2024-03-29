/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'custom-red': '#F4533E',
      'custom-white': '#F5F6F3',
      'custom-green': '#74AC5D',
      'custom-dark-green': '#3C592F',
      'custom-dark': '#121212',
      'custom-light-grey': '#A0A0A0',
      'custom-grey': '#505050',
      'custom-dark-grey': '#252525',
      'custom-blue': '#5AABD6',
      'custom-yellow': '#F7EA40',
      'custom-orange': '#F34A00',
      'custom-purple': '#7D34A7',
      'half-transparent': 'rgba(0, 0, 0, 0.5)',
      'twothird-transparent': 'rgba(0, 0, 0, 0.75)',
    },
    extend: {
      fontFamily: {
        'BaiJamjuree-Light': ['BaiJamjuree-Light'],
        'BaiJamjuree-Regular': ['BaiJamjuree-Regular'],
        'BaiJamjuree-Medium': ['BaiJamjuree-Medium'],
        'BaiJamjuree-Bold': ['BaiJamjuree-Bold'],
        'BaiJamjuree-LightItalic': ['BaiJamjuree-LightItalic'], 
        'BaiJamjuree-RegularItalic': ['BaiJamjuree-Italic'], 
        'BaiJamjuree-MediumItalic': ['BaiJamjuree-MediumItalic'], 
        'BaiJamjuree-BoldItalic': ['BaiJamjuree-BoldItalic'],
      },
      spacing: {
        0.25: '0.075rem',
        10.5: '2.625rem',
        22: '5.5rem',
        25: '6rem',
        30: '7.5rem',
        100: '25rem',
        104: '26rem'
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-custom-(red|white|green|dark|light-grey|grey|dark-grey|blue|yellow|purple)/
    },
    {
      pattern: /(half|twothird)-transparent/
    },
    {
      pattern: /(mt|mb|mr|ml|my|mx|px|py|pt|pb|pl|pr|dp)-[0-9]+(\.[0-9]+)?/
    },
    {
      pattern: /-(mt|mb|mr|ml|my|mx|px|py|pt|pb|pl|pr|dp)-[0-9]+(\.[0-9]+)?/
    },
    {
      pattern: /flex-.*/
    },
    {
      pattern: /(bottom|right|top|left)-[0-9]+(\.[0-9]+)?/
    },
    {
      pattern: /(w|h)-[0-9]+(\.[0-9]+)?/
    },
  ]
}

