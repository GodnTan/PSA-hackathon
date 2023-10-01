const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;
let awaitingTopics = false;
let pendingUserMessage = null; // Variable to store the user's pending message

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">person_4</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const splitUserInput = (input) => {
    // Split user input using commas (,) and "and"
    const separators = [',', 'and'];
    let topics = [input];
    
    separators.forEach(separator => {
        const newTopics = [];
        topics.forEach(topic => {
            newTopics.push(...topic.split(separator));
        });
        topics = newTopics;
    });

    return topics.map(topic => topic.trim().toLowerCase());
};


const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    if (awaitingTopics) {
        const topics = splitUserInput(userMessage);
        const topicResponses = {
            "programming": "Great choice! We offer a variety of programming courses. You can start with our beginner-friendly programming course.",
            "data science": "Data science is a fascinating field! We have comprehensive data science courses that cover topics like machine learning and data analysis.",
            "web development": "Web development is in high demand. Explore our web development courses to learn HTML, CSS, JavaScript, and more.",
            // Add more topics and responses as needed
        };

        chatbox.appendChild(createChatLi(pendingUserMessage, "outgoing"));
        topics.forEach(topic => {
            if (topicResponses.hasOwnProperty(topic)) {
                // Display the response based on the topic
                const response = topicResponses[topic];
                chatbox.appendChild(createChatLi(response, "incoming"));
            } else {
                // If the topic is not found in the responses map, provide a default response
                chatbox.appendChild(createChatLi(`I'm not sure about the topic "${topic}". Please check our available courses.`, "incoming"));
            }
        });

        awaitingTopics = false;
        pendingUserMessage = null;
    } else {
        const userMessageLower = userMessage.toLowerCase();
        const keywordResponses = {
            "hello": "Hello! How can I assist you today?",
            "goodbye": "Goodbye! Have a great day!",
            "help": "Sure, I'm here to help. What do you need assistance with?",
            "i want to learn": "What do you want to learn?",
            // Add more keywords and responses as needed
        };

        for (const keyword in keywordResponses) {
            if (userMessageLower.includes(keyword)) {
                chatbox.appendChild(createChatLi(userMessage, "outgoing"));

                setTimeout(() => {
                    const incomingChatLi = createChatLi(keywordResponses[keyword], "incoming");
                    chatbox.appendChild(incomingChatLi);
                    chatbox.scrollTo(0, chatbox.scrollHeight);
                }, 600);

                if (keyword === "i want to learn") {
                    awaitingTopics = true;
                    pendingUserMessage = userMessage;
                    chatInput.setAttribute("placeholder", "Enter the topics you want to learn (comma)");
                }

                return;
            }
        }

        if (pendingUserMessage) {
            awaitingTopics = true;
            pendingUserMessage += `, ${userMessage}`;
            chatInput.setAttribute("placeholder", "Enter the topics you want to learn (comma)");
        } else {
            chatbox.appendChild(createChatLi(userMessage, "outgoing"));

            setTimeout(() => {
                const incomingChatLi = createChatLi("I'm not sure how to respond to that.", "incoming");
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);

                chatInput.setAttribute("placeholder", "What do you want to learn?");
            }, 600);
        }
    }
}

const handleEnterKey = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatBtn.click();
    }
};

chatInput.addEventListener('keydown', handleEnterKey);

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
