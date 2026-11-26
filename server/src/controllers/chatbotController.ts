import { Request, Response } from 'express';
import { ChatMessage } from '../models/ChatMessage';
import { getChatbotResponse } from '../services/chatbotService';

export const sendChatMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    // Save user message
    const userMessage = await ChatMessage.create({
      userId: req.userId!,
      message,
      messageType: 'user',
      isRead: false,
    });

    // Get chatbot response
    const chatbotResponse = await getChatbotResponse(message);

    // Save chatbot message
    const botMessage = await ChatMessage.create({
      userId: req.userId!,
      message: chatbotResponse.reply,
      messageType: 'chatbot',
      category: chatbotResponse.category,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      userMessage,
      botMessage,
    });
  } catch (error) {
    console.error('Send chat message error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const messages = await ChatMessage.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'ASC']],
      limit: 50,
    });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Get chat history error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch chat history' });
  }
};

export const getAdminMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const where: any = {};
    if (userId) {
      where.userId = userId;
    }

    const messages = await ChatMessage.findAll({
      where,
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Get admin messages error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
};
