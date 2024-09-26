// Import necessary modules for building the project
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate HTML files
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Plugin to create a PWA manifest
const path = require('path'); // Module to handle file and directory paths
const { InjectManifest } = require('workbox-webpack-plugin'); // Plugin to inject the service worker

// Export the Webpack configuration
module.exports = () => {
  return {
    mode: 'development', // Set the mode for the build (development or production)
    entry: {
      // Define entry points for the application
      main: './src/js/index.js', // Main JavaScript file
      install: './src/js/install.js', // Installation logic for the PWA
    },
    output: {
      filename: '[name].bundle.js', // Output filename pattern for bundles
      path: path.resolve(__dirname, 'dist'), // Output directory for the built files
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // HTML template file to use
        inject: true, // Automatically injects the script tags
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the source service worker file
        swDest: 'src-sw.js', // Destination for the generated service worker file
        include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/], // File types to precache
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor', // Name of the PWA
        short_name: 'JATE', // Short name for the PWA
        description: 'A text editor that works offline.', // Description of the PWA
        start_url: '.', // URL to start the app
        background_color: '#ffffff', // Background color for the PWA
        theme_color: '#ffffff', // Theme color for the PWA
        display: 'standalone', // Display mode for the PWA
        orientation: 'portrait', // Orientation setting for the PWA
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), // Path to the logo icon
            sizes: '192x192', // Size of the icon
            type: 'image/png', // Type of the icon image
          },
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), // Path to the logo icon
            sizes: '512x512', // Another size for the icon
            type: 'image/png', // Type of the icon image
          },
        ],
        filename: 'manifest.json', // Output filename for the manifest
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // Rule for processing CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS
        },
        {
          test: /\.m?js$/, // Rule for processing JavaScript files
          exclude: /node_modules/, // Exclude the node_modules directory
          use: {
            loader: 'babel-loader', // Use Babel to transpile JavaScript
            options: {
              presets: ['@babel/preset-env'], // Preset for compiling modern JavaScript
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', // Plugin for object rest/spread properties
                '@babel/plugin-transform-runtime', // Plugin for reusing Babel's helper functions
              ],
            },
          },
        },
      ],
    },
  };
};

// Log each icon path for debugging purposes
const manifestIcons = [
  path.resolve(__dirname, 'src/images/logo.png'), // Include the logo in the log as well
];

// Log each icon path to the console
manifestIcons.forEach(icon => console.log(`Processing icon: ${icon}`));





