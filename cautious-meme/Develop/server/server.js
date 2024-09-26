// Import the Express framework to create the server
const express = require('express');
// Import the path module to handle file and directory paths
const path = require('path');

// Create an instance of the Express application
const app = express();
// Set the port to the environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware for parsing URL-encoded data and JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Serve static files from the 'client/src' directory for CSS and images
app.use(express.static(path.join(__dirname, '../client/src'))); // Serve CSS and images

// Serve the main HTML file when accessing the root URL
app.get('/', (req, res) => {
    // Send the 'index.html' file located in the 'client' directory
    res.sendFile(path.join(__dirname, '../client/index.html')); // Adjusted to point to index.html directly
});

// Include your HTML routes here if you have any, allowing for organized routing
require('./routes/htmlRoutes')(app);

// Start the server and listen for incoming requests on the specified PORT
app.listen(PORT, () => {
    // Log a message to the console when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});



