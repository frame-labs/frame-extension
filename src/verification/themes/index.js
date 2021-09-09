const defaultTheme = {
  moon: 'rgba(245, 110, 110, 1)',
  bad: 'rgb(249, 24, 128)', // 'rgba(235, 90, 140, 1)'
  good: 'rgb(0, 186, 124)', // 'rgb(0, 175, 145)'
  moonOver: 'rgba(60, 20, 20, 1)',
  badOver: 'rgb(100, 0, 0)',
  goodOver: 'rgb(0, 86, 24)',
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
  base0: 'rgb(26, 37, 48)', // Darkest Base
  base1: 'rgb(31, 42, 53)',
  base2: 'rgb(36, 47, 58)',
  base3: 'rgb(41, 52, 63)',
  base4: 'rgb(46, 57, 68)' // Lightest Base
}

themes['rgb(0, 0, 0)'] = {
  ...defaultTheme,
  base0: 'rgb(8, 8, 10)', // Darkest Base
  base1: 'rgb(13, 13, 15)',
  base2: 'rgb(18, 18, 20)',
  base3: 'rgb(23, 23, 25)',
  base4: 'rgb(28, 28, 30)' // Lightest Base
}

themes['rgb(255, 255, 255)'] = {
  ...defaultTheme,
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

