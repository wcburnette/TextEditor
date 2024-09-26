const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Your service worker source
        swDest: 'src-sw.js', // Output location
        include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/], // Assets to precache
        // Ensure it does not run multiple times
        // For example, you can check if the service worker has already been registered.
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor that works offline.',
        start_url: '.',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: path.resolve(__dirname, 'src/icons/icon-192x192.png'),
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: path.resolve(__dirname, 'src/icons/icon-512x512.png'),
            sizes: '512x512',
            type: 'image/png',
          },
        ].forEach(icon => console.log(`Processing icon: ${icon.src}`)),
        
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
