import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface IChatMessage {
  id?: number;
  userId: string;
  message: string;
  messageType: 'user' | 'admin' | 'chatbot';
  isRead: boolean;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ChatMessageCreationAttributes
  extends Optional<IChatMessage, 'id' | 'createdAt' | 'updatedAt'> {}

class ChatMessageModel
  extends Model<IChatMessage, ChatMessageCreationAttributes>
  implements IChatMessage
{
  public id!: number;
  public userId!: string;
  public message!: string;
  public messageType!: 'user' | 'admin' | 'chatbot';
  public isRead!: boolean;
  public category?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ChatMessageModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    messageType: {
      type: DataTypes.ENUM('user', 'admin', 'chatbot'),
      defaultValue: 'user',
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'app_chat_messages',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
    ],
  }
);

export const ChatMessage = ChatMessageModel;
