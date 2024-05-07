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
        botDiv.textContent = data.response;  // Ensure data.response is what you expect
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
document.getElementById('downloadAdmissionForm').addEventListener('click', function() {
    // Inform the user that the download will start
    alert('Starting download of the admission form...');

    // Start the file download
    window.location.href = '/download_admission_form';

    // Optional: Check if you want to perform any follow-up actions after the user has been prompted
    setTimeout(() => {
        alert('Check your downloads folder for the admission form.');
    }, 5000); // 5 seconds after the initial alert
});
