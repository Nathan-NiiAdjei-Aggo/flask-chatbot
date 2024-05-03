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
        // Create a new div for the bots response and append it to the message area
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

// Add an event listener to handle when the Enter key is pressed
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {  // Prevent sending messages on pressing 'Enter' with 'Shift'
        sendMessage();
        e.preventDefault();  // Prevent default to avoid any form submission
    }

});
function reportDissatisfaction() {
    fetch('/feedback', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({satisfied: 'no'})
    }).then(response => response.json())
        .then(data => {
            document.getElementById('chatbox').innerHTML += `<p>${data.response}</p>`;
        });
}