Text Editor Web Application
## Overview
This is a text editor web application that functions as a single-page application (SPA) and meets Progressive Web App (PWA) criteria. It features data persistence techniques, ensuring content is saved even when offline.

## Features
IndexedDB Storage: Uses IndexedDB for data persistence with methods for storing and retrieving data.
Automatic Saving: Automatically saves content when the DOM window loses focus.
Offline Functionality: Works without an internet connection.
Webpack Bundling: All JavaScript files are bundled using Webpack.
Service Worker: Registered service worker with Workbox to cache static assets.
Manifest File: Automatically generates a manifest.json file for PWA compliance.
Next-Gen JavaScript: Utilizes modern JavaScript features via Babel.

## Folder Structure
develop/ └── client/ ├── dist/ ├── favicon.ico ├── index.html ├── package.json ├── src/ │ ├── css/ │ │ └── style.css │ ├── images/ │ │ └── logo.png │ ├── js/ │ │ ├── database.js │ │ ├── editor.js │ │ ├── header.js │ │ ├── index.js │ │ └── install.js │ └── src-sw.js ├── server/ │ ├── package.json │ ├── server.js │ └── routes/ │ └── htmlRoutes.js └── webpack.config.js develop/ └── package.json └── README.md

## Getting Started
Prerequisites
Node.js (v14 or higher)
npm (Node Package Manager)

## Installation
Clone the repository:

git clone <https://github.com/wcburnette/TextEditor>
cd <develop/client>

## Install dependencies:

npm install

## Running the Application
To start the backend server and serve the client application, run:

npm run start

## Building for Production
To bundle the application using Webpack, run:

npm run build

## Using Webpack Plugins
When you run the build command, Webpack will:

Generate an HTML file.
Create a service worker for caching.
Generate a manifest.json file.

## Using Next-Gen JavaScript
The application uses Babel to support async/await and other modern JavaScript features, ensuring the text editor functions correctly in the browser without errors.

## IndexedDB Implementation
Upon opening the text editor, an IndexedDB database is created automatically.
Content entered in the text editor is saved in IndexedDB when the user clicks outside the text area.
Reopening the text editor retrieves the previously saved content.
Service Worker Registration
The service worker is registered on application load, caching static assets and enabling offline functionality.

## Installation as a PWA
Users can install the text editor application as an icon on their desktop using the Install button provided in the UI.
Deployment
To deploy this application to Render, ensure that proper build scripts are included in your configuration for the Webpack application.

## Build Scripts
Ensure your package.json contains the appropriate scripts:

"scripts": {
  "start": "node server/server.js",
  "build": "webpack --config webpack.config.js"
}

## Conclusion
This text editor web application is designed to provide a seamless user experience with reliable data persistence and offline functionality. The use of modern web technologies ensures that it meets PWA standards and remains efficient across various browsers.
