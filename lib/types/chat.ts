// Types pour le chat
export interface ChatInfo {
  name: string;
  image: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen?: string;
  isOnline: boolean;
}
