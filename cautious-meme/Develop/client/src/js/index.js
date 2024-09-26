// Import necessary modules
import { Workbox } from 'workbox-window'; // Import Workbox for service worker management
import { getDb, putDb } from './database'; // Import database functions

// Function to register the service worker
const registerSW = async () => {
  // Check if service workers are supported by the browser
  if ('serviceWorker' in navigator) {
    // Create a new Workbox instance
    const wb = new Workbox('./service-worker.js');
    
    // Event listener for when the service worker is ready
    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        // Show notification if there’s an update
        const toast = document.createElement('div'); // Create a toast notification
        toast.innerHTML = `New version available! <button id="refresh">Refresh</button>`; // Message
        document.body.appendChild(toast); // Append toast to body
        document.getElementById('refresh').addEventListener('click', () => {
          window.location.reload(); // Refresh the page when the button is clicked
        });
      }
    });

    // Register the service worker
    await wb.register(); // Register the service worker
  }
};

// Function to handle saving input data
const saveInput = async (content) => {
  await putDb(content); // Save the content to the database
};

// Function to handle loading input data
const loadInput = async () => {
  const content = await getDb(); // Retrieve content from the database
  document.getElementById('content').value = content; // Set the retrieved content to the input element
};

// Add event listener to save button
document.getElementById('save').addEventListener('click', async () => {
  const content = document.getElementById('content').value; // Get input value
  await saveInput(content); // Save the input to the database
});

// Call the loadInput function to load the data on script load
loadInput(); 
registerSW(); // Register the service worker
