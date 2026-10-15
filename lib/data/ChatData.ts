import { avatarUrl } from "~/lib/data/household";

export interface ChatMessage {
  id: string;
  message: string;
  isSent: boolean;
  time?: string;
}

export interface Conversation {
  id: string;
  name: string;
  image: string;
  /** Group conversations show an icon instead of a picture. */
  group?: "house" | "school";
  isOnline: boolean;
  unreadMessages: number;
  lastMessage: string;
  /** Last message sent by me and read by the other side. */
  lastSentRead?: boolean;
  time: string;
  messageList: ChatMessage[];
}

// Messages are stored newest first: the conversation FlatList is inverted.
const messages: ChatMessage[] = [
  { id: "12", message: "Super, à tout à l’heure", isSent: true, time: "10:24" },
  { id: "11", message: "Ok, je rentre vers 18 h.", isSent: false },
  { id: "10", message: "Parfait, merci ! On prend aussi des glaces pour Jade", isSent: true, time: "10:20" },
  { id: "9", message: "J’ai pris le lait. Le poisson était à 14 €, je l’ajoute au budget.", isSent: false },
  { id: "8", message: "Regarde la liste, j’ai ajouté le poisson et les plantains", isSent: true, time: "10:12" },
  { id: "7", message: "Je suis au marché, il manque quoi pour ce soir ?", isSent: false },
  { id: "6", message: "Oui, je dépose Jade et je file au marché", isSent: false },
  { id: "5", message: "Tu es déjà partie ?", isSent: true, time: "09:48" },
  { id: "4", message: "Merci ❤️", isSent: false },
  { id: "3", message: "Oui, et je l’ajoute à la liste pour demain", isSent: true, time: "19:02" },
  { id: "2", message: "Tu peux prendre le pain en rentrant ?", isSent: false },
];

const userlist: Conversation[] = [
  { id: "foyer", name: "Foyer Martin", image: "", group: "house", isOnline: false, unreadMessages: 3, lastMessage: "Camille : J’ai pris le lait 👍", time: "10:24", messageList: messages },
  { id: "camille", name: "Camille", image: avatarUrl("camille"), isOnline: true, unreadMessages: 2, lastMessage: "Tu passes chercher Jade ce soir ?", time: "09:51", messageList: messages },
  { id: "papa", name: "Papa", image: avatarUrl("papa"), isOnline: false, unreadMessages: 0, lastMessage: "Photo envoyée", lastSentRead: true, time: "Hier", messageList: messages },
  { id: "ines", name: "Inès", image: avatarUrl("ines"), isOnline: true, unreadMessages: 0, lastMessage: "Je m’occupe du gâteau", lastSentRead: false, time: "Lundi", messageList: messages },
  { id: "nathan", name: "Nathan", image: avatarUrl("nathan"), isOnline: false, unreadMessages: 0, lastMessage: "À samedi pour le foot", lastSentRead: true, time: "Dimanche", messageList: messages },
  { id: "jade", name: "Jade", image: avatarUrl("jade"), isOnline: true, unreadMessages: 0, lastMessage: "On peut avoir des glaces ?", time: "Samedi", messageList: messages },
  { id: "lucas", name: "Lucas", image: avatarUrl("lucas"), isOnline: false, unreadMessages: 0, lastMessage: "Merci pour hier soir !", lastSentRead: false, time: "12/10", messageList: messages },
  { id: "ce2", name: "Parents CE2 B", image: "", group: "school", isOnline: false, unreadMessages: 0, lastMessage: "Marc : la sortie est confirmée", time: "11/10", messageList: messages },
  { id: "mamie", name: "Mamie", image: avatarUrl("mamie"), isOnline: false, unreadMessages: 0, lastMessage: "Message vocal · 0:42", time: "10/10", messageList: messages },
];

export default {
  messages,
  userlist,
};
