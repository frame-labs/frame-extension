const defaultTheme = {
  moon: 'rgba(245, 110, 110, 1)',
  bad: 'rgb(249, 24, 128)', // 'rgba(235, 90, 140, 1)'
  good: 'rgb(0, 186, 124)', // 'rgb(0, 175, 145)'
  moonOver: 'rgba(60, 20, 20, 1)',
  badOver: 'rgb(255, 255, 255)',
  goodOver: 'rgb(255, 255, 255)',
  baseShadow: 'rgba(20, 20, 30, 0.3)',
  base4: 'rgb(40, 40, 50)', // Darkest Base
  base3: 'rgb(50, 50, 60)',
  base2: 'rgb(60, 60, 70)',
  base1: 'rgb(70, 70, 80)',
  base0: 'rgb(80, 80, 90)', // Lightest Base
  top0: 'rgb(255, 255, 255)', // Lightest Top
  top1: 'rgb(245, 245, 255)',
  top2: 'rgb(235, 235, 255)',
  top3: 'rgb(225, 225, 255)',
  top4: 'rgb(215, 215, 255)', // Darkest Top
  badge: {
    verified: {
      background: 'rgb(255, 255, 255)',
      color: 'rgb(0, 186, 124)'
    },
    unverified: {
      background: 'rgb(255, 255, 255)',
      color: 'rgb(249, 24, 128)'
    },
    default: {
      background: 'rgb(255, 255, 255)',
      color: 'rgb(0, 0, 0)'
    }
  }
}

const themes = {}

themes['rgb(21, 32, 43)'] = {
  ...defaultTheme,
  baseShadow: 'rgba(16, 27, 38, 0.8)',
  base4: 'rgb(21, 32, 43)', // Darkest Base
  base3: 'rgb(25, 37, 48)',
  base2: 'rgb(29, 41, 52)',
  base1: 'rgb(33, 45, 56)',
  base0: 'rgb(37, 49, 60)' // Lightest Base
}

themes['rgb(0, 0, 0)'] = {
  ...defaultTheme,
  baseShadow: 'rgba(0, 0, 0, 0.9)',
  base4: 'rgb(9, 9, 12)', // Darkest Base
  base3: 'rgb(14, 14, 17)',
  base2: 'rgb(19, 19, 22)',
  base1: 'rgb(24, 24, 27)',
  base0: 'rgb(29, 29, 32)' // Lightest Base
}

themes['rgb(255, 255, 255)'] = {
  ...defaultTheme,
  baseShadow: 'rgba(120, 130, 150, 0.4)',
  base4: 'rgb(226, 226, 235)', // Darkest Base
  base3: 'rgb(231, 231, 240)',
  base2: 'rgb(237, 237, 245)',
  base1: 'rgb(245, 245, 250)',
  base0: 'rgb(255, 255, 255)', // Lightest Base
  top0: 'rgb(83, 100, 113)', // Lightest Top
  top1: 'rgb(78, 95, 108)',
  top2: 'rgb(73, 90, 103)',
  top3: 'rgb(68, 85, 98)',
  top4: 'rgb(63, 80, 93)', // Darkest Top
  badge: {
    verified: {
      background: 'rgb(0, 186, 124)',
      color: 'rgb(255, 255, 255)'
    },
    unverified: {
      background: 'rgb(249, 24, 128)',
      color: 'rgb(255, 255, 255)'
    },
    default: {
      background: 'rgb(83, 100, 113)',
      color: 'rgb(255, 255, 255)'
    }
  }
}

export default (backgroundColor) => {
  if (themes[backgroundColor]) return themes[backgroundColor]
  return defaultTheme
}
