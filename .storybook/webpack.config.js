// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const SRC_PATH = path.join(__dirname, '../packages/client/src');
const CLIENT_PATH = path.join(__dirname, '../packages/client');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('awesome-typescript-loader'),
        include: [SRC_PATH],
        options: {
          configFileName: CLIENT_PATH + '/tsconfig.json',
        },
      },
      {
        test: /\.(jpg|png|svg|otf)$/,
        loader: 'file-loader',
        include: SRC_PATH,
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      {
        test: /\.scss$/,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: true,
            camelCase: 'dashes',
            getLocalIdent: getCSSModuleLocalIdent,
          },
          'sass-loader'
        ),
        include: SRC_PATH,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    enforceExtension: false,
    alias: {
      '@root': SRC_PATH,
      '@root/*': '@root/*',
      '@icons': '@root/assets/icons',
      '@components': '@root/components',
      '@stores': '@root/stores',
      '@services': '@root/services',
      '@styles': '@root/styles',
      '@styles/*': '@root/styles/*',
      '@lib': '@root/lib',
      '@lib/*': '@root/lib/*',
      '@ducks': '@root/ducks',
      '@ducks/*': '@root/ducks/*',
    },
  },
};
