const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // grab the event 
  window.defferedPrompt = event;

  // make the install button visible to the user to install
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // checks to see if defferedPrompt has been set in beforeInstallPrompt function
  const promptUser = window.defferedPrompt;
  if (!promptUser) return;

  // otherwise prompt the user
  promptUser.prompt();

  // after prompt reset defferedPrompt back to null
  window.defferedPrompt = null;

  // now that app is installed hide the button
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // checks if app is already installed, if so resets defferedPrompt to null
  window.defferedPrompt = null;
});
