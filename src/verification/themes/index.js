const defaultTheme = {
  moon: 'rgba(245, 110, 110, 1)',
  bad: 'rgb(249, 24, 128)', // 'rgba(235, 90, 140, 1)'
  good: 'rgb(0, 186, 124)', // 'rgb(0, 175, 145)'
  moonOver: 'rgba(60, 20, 20, 1)',
  badOver: 'rgb(100, 0, 0)',
  goodOver: 'rgb(0, 60, 0)',
  baseShadow: 'rgba(20, 20, 30, 0.3)',
  base0: 'rgb(40, 40, 50)', // Darkest Base
  base1: 'rgb(50, 50, 60)',
  base2: 'rgb(60, 60, 70)',
  base3: 'rgb(70, 70, 80)',
  base4: 'rgb(80, 80, 90)', // Lightest Base
  top0: 'rgb(255, 255, 255)', // Lightest Top
  top1: 'rgb(245, 245, 255)',
  top2: 'rgb(235, 235, 255)',
  top3: 'rgb(225, 225, 255)',
  top4: 'rgb(215, 215, 255)', // Darkest Top
  badgeColor: 'rgb(245, 245, 255)'
}

const themes = {}

themes['rgb(21, 32, 43)'] = {
  ...defaultTheme,
  baseShadow: 'rgba(21, 32, 43, 0.3)',
  base0: 'rgb(30, 41, 52)', // Darkest Base
  base1: 'rgb(35, 46, 57)',
  base2: 'rgb(40, 51, 62)',
  base3: 'rgb(45, 56, 67)',
  base4: 'rgb(50, 61, 72)' // Lightest Base
}

themes['rgb(0, 0, 0)'] = {
  ...defaultTheme,
  baseShadow: 'rgba(0, 0, 0, 0.3)',
  base0: 'rgb(16, 16, 18)', // Darkest Base
  base1: 'rgb(21, 21, 23)',
  base2: 'rgb(26, 26, 28)',
  base3: 'rgb(31, 31, 33)',
  base4: 'rgb(36, 36, 38)' // Lightest Base
}

themes['rgb(255, 255, 255)'] = {
  ...defaultTheme,
  baseShadow: 'rgba(220, 220, 223, 0.3)',
  base0: 'rgb(240, 240, 243)', // Darkest Base
  base1: 'rgb(245, 245, 248)',
  base2: 'rgb(250, 250, 253)',
  base3: 'rgb(255, 255, 255)',
  base4: 'rgb(255, 255, 255)', // Lightest Base
  top0: 'rgb(55, 55, 55)', // Lightest Top
  top1: 'rgb(45, 45, 55)',
  top2: 'rgb(35, 35, 55)',
  top3: 'rgb(25, 25, 55)',
  top4: 'rgb(15, 15, 55)', // Darkest Top
  badgeColor: 'rgb(55, 55, 55)'
}

export default (backgroundColor) => {
  if (themes[backgroundColor]) return themes[backgroundColor]
  return defaultTheme
}

