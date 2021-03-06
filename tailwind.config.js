const _ = require('lodash')

module.exports = {
  theme: {
    extend: {
      screens: {
        xxl: '1680px',
      },
      colors: {
        code: {
          "header": "#2f3e46",
          "background": "#1b2b34",
          "text": "#d8dee9"
        }, 
        red: {
          "100": "#f2d7d8",
          "200": "#f3b8bc",
          "300": "#f399a5",
          "400": "#f0667f",
          "500": "#ea3a66",
          "600": "#e1175a",
          "700": "#d10f4a",
          "800": "#bb0c3f",
          "900": "#a20c36",
        },
      }
    }
  },
  variants: {
    backgroundColor: ['focus', 'hover', 'dark', 'dark-focus', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['focus', 'hover', 'dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['focus', 'hover', 'dark', 'dark-focus', 'dark-hover', 'dark-active', 'dark-placeholder']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    ({ addUtilities, addVariant, config, e, theme }) => {
      addUtilities(_.map(config('theme.screens'), (value, key) => {
        return {
          [`.${e(`max-w-screen-${key}`)}`]: {
            "max-width": `${value} !important`
          }
        }
      }))
    },
    ({ addUtilities, e, theme, }) => {
      addUtilities(_.fromPairs(
        _.map(theme('opacity'), (value, modifier) => {
          return [
            `.${e(`placeholder-opacity-${modifier}`)}::placeholder`,
            {
              opacity: value,
            },
          ]
        })
      ))
    }
  ],
  purge: {
    options: {
      whitelist: ['mode-dark']
    },
    content: [
      './app/javascript/controllers/search_controller.js',
      './app/javascript/controllers/code_example_controller.js',
      './app/**/*.html.slim',
    ],
  }
}
