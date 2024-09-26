// Import the path module to handle file and directory paths
const path = require('path');

// Export a function that defines a route for the Express application
module.exports = (app) =>
  // Set up a GET route for the root URL ('/')
  app.get('/', (req, res) =>
    // Send the 'index.html' file located in the 'dist' directory of the client
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );

