function displayGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greet = (hour < 12) ? "Good Morning, Admin" :
                (hour < 18) ? "Good Afternoon, Admin" :
                              "Good Evening, Admin";
    document.getElementById("greetingText").textContent = greet;
}

function displayTime() {
    const now = new Date();
    // Format: Sunday, 2 Dec 2025, 14:05:12
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById("currentTime").textContent = `${dateString}, ${timeString}`;
}

// Update every second
setInterval(displayTime, 1000);

// Initial display
displayGreeting();
displayTime();
