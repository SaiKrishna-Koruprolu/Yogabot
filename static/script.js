const chatForm = document.getElementById('chat-form');
const chatLog = document.getElementById('chat-log');
const suggestions = document.querySelectorAll('.suggestions p');

suggestions.forEach((suggestion) => {
    suggestion.addEventListener('click', () => {
        const message = suggestion.textContent;
        const response = fetch('/send_message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        }).then((response) => response.json()).then((responseText) => {
            const chatLogEntry = document.createElement('p');
            chatLogEntry.textContent = `You: ${message}\nYogabot: ${responseText}`;
            chatLog.appendChild(chatLogEntry);
            chatLog.scrollTop = chatLog.scrollHeight;
        });
    });
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const response = await fetch('/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });
    const responseText = await response.json();
    const chatLogEntry = document.createElement('p');
    chatLogEntry.textContent = `You: ${message}\nYogabot: ${responseText}`;
    chatLog.appendChild(chatLogEntry);
    chatLog.scrollTop = chatLog.scrollHeight;
    document.getElementById('message').value = '';
});