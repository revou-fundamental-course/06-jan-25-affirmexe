// Function to load messages from localStorage
function loadMessages() {
  const messageHistory =
    JSON.parse(localStorage.getItem("messageHistory")) || [];
  messageHistory.forEach((message) => displayMessage(message));
}

// Function to display a message
function displayMessage(message) {
  const messageItem = document.createElement("div");
  messageItem.classList.add("message-item", "border", "p-3", "mb-3", "rounded");

  messageItem.innerHTML = `
    <h5>${message.fullName} (${
    message.gender.charAt(0).toUpperCase() + message.gender.slice(1)
  })</h5>
    <p><strong>Date of Birth:</strong> ${message.dob}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Comments:</strong> ${message.comments}</p>
    <hr>
  `;

  document.getElementById("messageHistory").appendChild(messageItem);
}

// Handle form submission
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const fullName = document.getElementById("fullName").value;
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const comments = document.getElementById("comments").value;

    // Create a new message object
    const newMessage = { fullName, dob, email, gender, comments };

    // Get current message history from localStorage
    const messageHistory =
      JSON.parse(localStorage.getItem("messageHistory")) || [];

    // Add the new message to the history
    messageHistory.push(newMessage);

    // Save updated message history to localStorage
    localStorage.setItem("messageHistory", JSON.stringify(messageHistory));

    // Display the new message
    displayMessage(newMessage);

    // Clear the form
    document.getElementById("userForm").reset();
  });

// Handle the "Clear History" button click
document.getElementById("clearHistory").addEventListener("click", function () {
  // Clear message history from localStorage
  localStorage.removeItem("messageHistory");

  // Clear messages from the page
  document.getElementById("messageHistory").innerHTML =
    "<p>No messages available.</p>";
});

// Load the messages when the page is loaded
window.onload = loadMessages;
