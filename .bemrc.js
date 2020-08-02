module.exports = {
  root: true,

  levels: [
    {
      path: './src/blocks'
    },
  ],

  modules: {
    'bem-tools': {
      plugins: {
        create: {
          levels: {
            './src/blocks': {
              default: true,
              techs: ['css'],
            }
          }
        }
      }
    }
  }
}