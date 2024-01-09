function startCountdown() {
  stopCountdown(); 

  const countdownDateInput = document.getElementById('countdownDate');
  const selectedDateTime = new Date(countdownDateInput.value).getTime();

  if (isNaN(selectedDateTime)) {
    alert('Please select a valid date and time.');
    return;
  }

  const timerDisplay = document.getElementById('timer');

  window.countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const duration = selectedDateTime - now;

    if (duration <= 0) {
      clearInterval(window.countdownInterval);
      timerDisplay.innerHTML = 'Countdown Finished';
      return;
    }

    const days = Math.floor(duration / (3600 * 24 * 1000));
    const hours = Math.floor((duration % (3600 * 24 * 1000)) / (3600 * 1000));
    const minutes = Math.floor((duration % (3600 * 1000)) / (60 * 1000));
    const seconds = Math.floor((duration % (60 * 1000)) / 1000);

    const displayTimer = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    timerDisplay.innerHTML = displayTimer;
  }, 1000);

  
  const countdownDateTime = countdownDateInput.value;
  const eventName = document.getElementById('eventName').value || 'Unnamed Event';
  const eventKey = `event_${eventName}`;
  localStorage.setItem(eventKey, countdownDateTime);

  
  displaySavedEvents();
}

function stopCountdown() {
  clearInterval(window.countdownInterval);
}

function resetCountdown() {
  stopCountdown();
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = 'Countdown Timer';
}

function saveEvent() {
  const countdownDateInput = document.getElementById('countdownDate');
  const selectedDateTime = countdownDateInput.value;

  if (!selectedDateTime) {
    alert('Please select a date and time.');
    return;
  }

  const eventName = document.getElementById('eventName').value || 'Unnamed Event';
  const eventKey = `event_${eventName}`;
  localStorage.setItem(eventKey, selectedDateTime);
  displaySavedEvents();
}

function displaySavedEvents() {
  const savedEventsContainer = document.getElementById('savedEvents');
  savedEventsContainer.innerHTML = ''; 

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('event_')) {
      const eventName = key.substring(6); 
      const countdownDateTime = localStorage.getItem(key);

      const eventDisplay = document.createElement('div');
      eventDisplay.classList.add('saved-event');
      eventDisplay.textContent = `${eventName}: ${countdownDateTime}`;

      savedEventsContainer.appendChild(eventDisplay);
    }
  }
}


window.onload = displaySavedEvents;
