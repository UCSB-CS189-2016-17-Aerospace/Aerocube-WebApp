/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      exclude: /flexboxgrid/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader?importLoaders=1!postcss-loader'],
    }, {
      test: /\.css$/,
      loader: 'style-loader!css?modules',
      include: /flexboxgrid/,
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.md$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: true,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
      },
    }, {
      test: /react-icons[\/\\](.)*(.js)$/,
      loader: 'babel-loader'
    }],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports?self.fetch!whatwg-fetch',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          postcssFocus(), // Add a :focus to every :hover
          cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 5 versions', 'IE > 9'], // ...based on this browser list
          }),
        ]
      },
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
});
