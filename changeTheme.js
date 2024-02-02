function darkmode() {
  const wasDarkmode = localStorage.getItem('darkmode') === 'true';
  localStorage.setItem('darkmode', !wasDarkmode);
  const element = document.body;
  element.classList.toggle('dark-mode', !wasDarkmode);

  // Update the button text
  const themeButton = document.getElementById('themeButton');
  themeButton.textContent = wasDarkmode ? 'Light Mode' : 'Dark Mode';
}

function onload() {
  const isDarkmode = localStorage.getItem('darkmode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkmode);

  // Update the button text
  const themeButton = document.getElementById('themeButton');
  themeButton.textContent = isDarkmode ? 'Dark Mode' : 'Light Mode';
}


 