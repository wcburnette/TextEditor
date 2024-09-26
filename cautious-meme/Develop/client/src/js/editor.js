// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database'; // Import the database functions for data retrieval and storage
import { header } from './header'; // Import the header content as a fallback

// Define the main class for the editor functionality
export default class {
  constructor() {
    // Retrieve previously saved content from localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded; if not, throw an error
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded'); // Alert if CodeMirror is not available
    }

    // Initialize the CodeMirror editor with specific options
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', // Initial content of the editor
      mode: 'javascript', // Set the syntax highlighting to JavaScript
      theme: 'monokai', // Use the Monokai theme for the editor
      lineNumbers: true, // Show line numbers on the left
      lineWrapping: true, // Enable line wrapping for long lines
      autofocus: true, // Automatically focus the editor on load
      indentUnit: 2, // Set the indentation size to 2 spaces
      tabSize: 2, // Set the tab size to 2 spaces
    });

    // When the editor is ready, load data from IndexedDB
    // If no data is found, fall back to localStorage; if neither is available, use the header content
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor'); // Log loading action
      this.editor.setValue(data || localData || header); // Set the editor's value to the loaded data
    });

    // Event listener for changes in the editor
    this.editor.on('change', () => {
      // Save the current value of the editor to localStorage
      localStorage.setItem('content', this.editor.getValue()); // Update localStorage with the current content
    });

    // Event listener for when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus'); // Log when the editor loses focus
      putDb(localStorage.getItem('content')); // Save the current content to IndexedDB
    });
  }
}

