"use strict";

var chatForm = document.getElementById('chat-form');
var chatLog = document.getElementById('chat-log');
var suggestions = document.querySelectorAll('.suggestions p');
suggestions.forEach(function (suggestion) {
  suggestion.addEventListener('click', function () {
    var message = suggestion.textContent;
    var response = fetch('/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    }).then(function (response) {
      return response.json();
    }).then(function (responseText) {
      var chatLogEntry = document.createElement('p');
      chatLogEntry.textContent = "You: ".concat(message, "\nYogabot: ").concat(responseText);
      chatLog.appendChild(chatLogEntry);
      chatLog.scrollTop = chatLog.scrollHeight;
    });
  });
});
chatForm.addEventListener('submit', function _callee(e) {
  var message, response, responseText, chatLogEntry;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          message = document.getElementById('message').value;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('/send_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: message
            })
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          responseText = _context.sent;
          chatLogEntry = document.createElement('p');
          chatLogEntry.textContent = "You: ".concat(message, "\nYogabot: ").concat(responseText);
          chatLog.appendChild(chatLogEntry);
          chatLog.scrollTop = chatLog.scrollHeight;
          document.getElementById('message').value = '';

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
//# sourceMappingURL=script.dev.js.map
