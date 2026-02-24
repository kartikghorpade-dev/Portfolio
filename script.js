document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let successMessage = document.getElementById("successMessage");

    // Validation
    if (name === "") {
        alert("Name cannot be empty");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter valid email");
        return;
    }

    // Store in Local Storage
    let feedback = {
        name: name,
        email: email,
        message: message
    };

    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    feedbackList.push(feedback);
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

    successMessage.textContent = "Feedback submitted successfully!";

    displayFeedback();

    document.getElementById("feedbackForm").reset();
});

function displayFeedback() {
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    let feedbackDisplay = document.getElementById("feedbackDisplay");

    feedbackDisplay.innerHTML = "<h3>Submitted Feedback:</h3>";

    feedbackList.forEach(function(item) {
        feedbackDisplay.innerHTML += `
            <p><strong>${item.name}</strong> (${item.email})<br>
            ${item.message}</p>
            <hr>
        `;
    });
}

displayFeedback();

// Fade-in on Scroll
const sections = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            section.classList.add("show");
        }
    });
});