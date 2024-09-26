// Import the openDB function from the idb library to work with IndexedDB
import { openDB } from 'idb';

// Initialize the database and create an object store if it doesn't already exist
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists'); // Log message if the database exists
        return; // Exit function if it does
      }
      // Create a new object store with auto-incrementing IDs
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created'); // Log message indicating creation
    },
  });

// Function to update the database with new content
export const putDb = async (content) => {
  const db = await openDB('jate', 1); // Open the database
  const tx = db.transaction('jate', 'readwrite'); // Create a transaction
  const store = tx.objectStore('jate'); // Access the object store
  const request = store.put({ id: 1, content }); // Store content with ID 1
  const result = await request; // Wait for the request to complete
  console.log('Data saved to the database', result); // Log the result
};

// Function to get content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1); // Open the database
  const tx = db.transaction('jate', 'readonly'); // Create a read-only transaction
  const store = tx.objectStore('jate'); // Access the object store
  const request = store.get(1); // Get the content with ID 1
  const result = await request; // Wait for the request to complete
  console.log('Data retrieved from the database', result); // Log the result
  return result?.content; // Return the content if it exists
};

// Call the initdb function to initialize the database on script load
initdb();


