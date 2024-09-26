// Select the install button element from the DOM
const butInstall = document.getElementById('buttonInstall');

// Logic for handling the installation of the Progressive Web App (PWA)
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the event for triggering the installation prompt later
  window.deferredPrompt = event;
  
  // Make the install button visible by removing the 'hidden' class
  butInstall.classList.toggle('hidden', false);
});

// Add an event listener to the install button for when it is clicked
butInstall.addEventListener('click', async () => {
  // Retrieve the stored prompt event
  const promptEvent = window.deferredPrompt;
  
  // If there's no prompt event, exit the function
  if (!promptEvent) {
    return;
  }
  
  // Show the installation prompt to the user
  promptEvent.prompt();
  
  // Clear the deferred prompt variable, as it can only be used once
  window.deferredPrompt = null;
  
  // Hide the install button again after the prompt is shown
  butInstall.classList.toggle('hidden', true);
});

// Add an event listener to the window to handle the app installation event
window.addEventListener('appinstalled', (event) => {
  // Log a message to the console indicating that the app has been installed
  console.log('App installed.'); 
});


