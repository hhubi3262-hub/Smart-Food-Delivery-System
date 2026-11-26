import axios from 'axios';

interface ChatbotResponse {
  reply: string;
  category: string;
}

// Rule-based chatbot responses
const getAutoResponse = (userMessage: string): ChatbotResponse => {
  const message = userMessage.toLowerCase();

  // Menu questions
  if (message.includes('menu') || message.includes('what do you serve')) {
    return {
      reply:
        "We serve Coffee, Breakfast, Lunch, Dinner, Desserts, and Drinks. Would you like to see our full menu?",
      category: 'menu_question',
    };
  }

  if (message.includes('coffee')) {
    return {
      reply:
        'We have various coffee options including Espresso, Cappuccino, Latte, Americano, and Macchiato. All freshly brewed!',
      category: 'menu_question',
    };
  }

  if (message.includes('breakfast')) {
    return {
      reply:
        'Our breakfast includes pastries, omelettes, pancakes, and more. Served from 7 AM to 11 AM daily.',
      category: 'menu_question',
    };
  }

  // Hours
  if (message.includes('hours') || message.includes('open') || message.includes('close')) {
    return {
      reply:
        'We are open Monday to Sunday from 7 AM to 10 PM. Enjoy our early bird specials from 7-9 AM!',
      category: 'menu_question',
    };
  }

  // Order status
  if (message.includes('order') || message.includes('status')) {
    return {
      reply:
        'You can track your order in real-time in your user dashboard. Is there a specific order you need help with?',
      category: 'order_status',
    };
  }

  // Reservation
  if (message.includes('reservation') || message.includes('table') || message.includes('book')) {
    return {
      reply:
        'You can book a table through our website! We accommodate groups from 1 to 20 people. Would you like to make a reservation?',
      category: 'reservation',
    };
  }

  // Delivery
  if (message.includes('delivery')) {
    return {
      reply:
        'We offer fast delivery within the city. Delivery fee is calculated based on distance. You can order online now!',
      category: 'menu_question',
    };
  }

  // Payment
  if (message.includes('pay') || message.includes('payment')) {
    return {
      reply: 'We accept all major credit cards, debit cards, and digital wallets. Safe and secure checkout!',
      category: 'menu_question',
    };
  }

  // Default
  return {
    reply:
      "Thanks for your message! I'm here to help. You can ask me about our menu, hours, delivery, or reservations. How can I assist you?",
    category: 'general',
  };
};

// AI-powered chatbot using OpenAI (optional, if API key is available)
export const getAIChatbotResponse = async (userMessage: string): Promise<ChatbotResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Fall back to rule-based chatbot
    return getAutoResponse(userMessage);
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful customer support chatbot for Afamia Café & Restaurant. 
            You help customers with menu questions, order status, reservations, and general inquiries.
            Be friendly, professional, and concise.`,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;
    return {
      reply: aiReply,
      category: 'ai_response',
    };
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    // Fall back to rule-based chatbot
    return getAutoResponse(userMessage);
  }
};

// Rule-based chatbot (no API key needed)
export const getChatbotResponse = async (userMessage: string): Promise<ChatbotResponse> => {
  return getAutoResponse(userMessage);
};
