// Function to handle sending messages and receiving responses
function sendMessage() {
    const input = document.getElementById('userInput');
    const messageArea = document.getElementById('messageArea');

    // Create a new div for the user's message and append it to the message area
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = input.value;  // Use textContent to prevent XSS vulnerabilities
    messageArea.appendChild(userDiv);

    // Clear the input box
    input.value = '';

    // Send the user's message to the server and handle the response
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: userDiv.textContent})  // Send the safe text content
    })
    .then(response => response.json())
    .then(data => {
        // Create a new div for the bot's response and append it to the message area
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = data.response;  // Safely add server's response
        messageArea.appendChild(botDiv);

        // Scroll to the bottom of the message area to show the newest message
        messageArea.scrollTop = messageArea.scrollHeight;
    })
    .catch((error) => {
        console.error('Error:', error);
        // Optionally display a user-friendly error message in the chat interface
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'An error occurred while sending your message.';
        messageArea.appendChild(errorDiv);
        messageArea.scrollTop = messageArea.scrollHeight;
    });
}

// Function to handle user dissatisfaction
function handleNotSatisfied() {
    const userName = prompt("Please enter your name:");
    const userEmail = prompt("Please enter your email address:");
    if (userName && userEmail) {
        sendDataToServer(userName, userEmail);
    } else {
        alert("Name and email are required to proceed!");
    }
}

// Function to send data to server
function sendDataToServer(name, email) {
    fetch('/register_complaint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, email: email})
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Response from server
    })
    .catch(error => console.error('Error:', error));
}

// Event listeners for chat interactions
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {  // Check if 'Enter' key is pressed without the 'Shift' key
        sendMessage();  // Call the sendMessage function to handle sending the message
        e.preventDefault();  // Prevent the default action (e.g., form submission)
    }
});
