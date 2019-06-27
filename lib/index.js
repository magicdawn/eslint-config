const yml = name => `${__dirname}/yml/${name}.yml`

module.exports = {
  base: {
    extends: [
      //
      yml('base'),
      yml('rules'),
    ],
  },

  vue: {
    extends: [
      //
      yml('vue'),
      yml('rules'),
    ],
  },
}
