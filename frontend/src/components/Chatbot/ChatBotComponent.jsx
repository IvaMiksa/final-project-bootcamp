import React from 'react';
import ChatBot from 'react-chatbotify';

const ChatBotComponent = () => {
    const themes1 = [
        {id: "minimal_midnight", version: "0.1.0"},
        {id: "simple_blue", version: "0.1.0"}
    ];

    //const helpOptions = ["Sign in", "About us"];
    const faqCategories = ["General", "For Digital Nomads", "For Property Owners", "Safety & Support"];

    const flow = {
        start: {
            message: "Hello, I am Tan Jin 👋! Welcome to React ChatBotify, I'm here to assist you with Nomadly! Please select a category to view frequently asked questions:",
            options: faqCategories,
            path: async (params) => {
                switch (params.userInput) {
                    case "General":
                        return "faq_general";
                    case "For Digital Nomads":
                        return "faq_digital_nomads";
                    case "For Property Owners":
                        return "faq_property_owners";
                    case "Safety & Support":
                        return "faq_safety_support";
                    default:
                        return "unknown_input";
                }
            }
        },
        faq_general: {
            message: "Here are some general questions. Select one to learn more:",
            options: [
                "What is Nomadly?",
                "Who can use Nomadly?",
                "How do I sign up?"
            ],
            path: async (params) => {
                switch (params.userInput) {
                    case "What is Nomadly?":
                        return "faq_what_is_website";
                    case "Who can use Nomadly?":
                        return "faq_who_can_use";
                    case "How do I sign up?":
                        return "faq_how_sign_up";
                    default:
                        return "unknown_input";
                }
            }
        },
        faq_digital_nomads: {
            message: "Questions for digital nomads:",
            options: [
                "How do I find and book a property?",
                "Are there special features for digital nomads?",
                "Can I make long-term bookings?"
            ],
            path: async (params) => {
                switch (params.userInput) {
                    case "How do I find and book a property?":
                        return "faq_find_and_book";
                    case "Are there special features for digital nomads?":
                        return "faq_features_nomads";
                    case "Can I make long-term bookings?":
                        return "faq_long_term_bookings";
                    default:
                        return "unknown_input";
                }
            }
        },
        faq_property_owners: {
            message: "Questions for property owners:",
            options: [
                "How do I list my property?",
                "What are the requirements for listing my property?",
                "How does booking and payment work?"
            ],
            path: async (params) => {
                switch (params.userInput) {
                    case "How do I list my property?":
                        return "faq_list_property";
                    case "What are the requirements for listing my property?":
                        return "faq_property_requirements";
                    case "How does booking and payment work?":
                        return "faq_booking_payment";
                    default:
                        return "unknown_input";
                }
            }
        },
        faq_safety_support: {
            message: "Safety & Support questions:",
            options: [
                "Is my information secure?",
                "What if I encounter an issue during my stay or with a guest?"
            ],
            path: async (params) => {
                switch (params.userInput) {
                    case "Is my information secure?":
                        return "faq_info_security";
                    case "What if I encounter an issue during my stay or with a guest?":
                        return "faq_issue_support";
                    default:
                        return "unknown_input";
                }
            }
        },
        faq_what_is_website: {
            message: "Nomadly is a platform connecting digital nomads with flexible housing options worldwide. Whether you’re looking for short-term accommodations or longer stays with work-friendly amenities, Nomadly makes it easy for digital nomads to find the right place. Property owners can list their spaces to reach remote workers looking for a comfortable and convenient home base.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_who_can_use: {
            message: "Nomadly is designed for digital nomads, remote workers, and property owners with spaces suited for work-friendly stays. Whether you're searching for your next destination or have a property to rent, our platform can connect you with the right people.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_how_sign_up: {
            message: "Signing up is simple. If you’re a digital nomad looking for accommodation, select “Sign Up as a Digital Nomad” to create a profile. Property owners can select “Sign Up as a Property Owner” to start listing properties.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_find_and_book: {
            message: "After creating a profile, you can browse available listings based on location, dates, and amenities. Once you’ve found a property that suits your needs, submit a booking request. The property owner will review your request and confirm the reservation.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_features_nomads: {
            message: "Yes! We highlight work-friendly amenities like high-speed internet, dedicated workspaces, and quiet environments to ensure properties meet the needs of remote workers. Many listings also offer discounts for longer stays, allowing digital nomads to save on extended bookings.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_long_term_bookings: {
            message: "Absolutely! Our platform supports flexible booking durations, from one to several months. Many property owners provide discounts for extended stays, making long-term bookings more affordable.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_list_property: {
            message: "Each property has its own cancellation policy, which is displayed on the listing page. Review the terms before booking, and if you need to cancel, follow the steps in the “My Bookings” section of your account.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_property_requirements: {
            message: "Properties with work-friendly amenities like high-speed internet and ergonomic furniture are popular.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_booking_payment: {
            message: "After accepting a booking request, payment is securely handled through the platform.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_info_security: {
            message: "Yes, we use industry-standard security practices to protect your personal information.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        faq_issue_support: {
            message: "If you encounter an issue, you can reach our support team through the 'Help' section.",
            options: ["Return to FAQ Categories"],
            path: "start"
        },
        unknown_input: {
            message: "Sorry, I do not understand your message 😢! Please select a category or option from the FAQ.",
            options: faqCategories,
            path: "start"
        }
    };

    return (
        <ChatBot
            id="example_faq_bot"
            flow={flow}
            themes={themes1}
            settings={{chatHistory: {storageKey: "example_faq_bot", disabled: true}}}
        />
    );
};

export default ChatBotComponent;
