import prettierConfig from 'eslint-config-prettier'
import frameLabsConfig from '@framelabs/config/eslint'
import globals from 'globals'

export default [
  ...frameLabsConfig,
  {
    files: ['webpack.*.js', 'src/inline.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['src/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: true
      }
    }
  },
  prettierConfig
]
