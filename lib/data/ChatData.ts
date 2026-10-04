// les messages sont dans une pile, et le dernier message est en bas de la liste
const messages = [
  {
    id: "13",
    message:
      "Absolutely! I’ll send you some pictures from the hike. Bye for now!",
    isSent: false,
  },
  {
    id: "12",
    message: "Thanks! You take care too, talk soon!",
    isSent: true,
  },
  {
    id: "11",
    message: "Alright, let me know. Have a great time and enjoy the hike!",
    isSent: false,
  },
  {
    id: "10",
    message: "For sure! Let’s plan something soon.",
    isSent: true,
  },
  {
    id: "9",
    message:
      "Sounds like a perfect plan! I should join you sometime. Need to get out and enjoy nature more.",
    isSent: false,
  },
  {
    id: "8",
    message:
      "Thinking of going hiking in the mountains. It’s been so long since I’ve had a good outdoor adventure.",
    isSent: true,
  },
  {
    id: "7",
    message: "Any plans for the weekend?",
    isSent: false,
  },
  {
    id: "6",
    message:
      "Yeah, definitely relieved. I’m looking forward to some time off this weekend.",
    isSent: true,
  },
  {
    id: "5",
    message:
      "That's impressive! I bet you're relieved it's over. I’ve been working a lot too, but not as intense.",
    isSent: false,
  },
  {
    id: "4",
    message:
      "It was a software update for our main product. Took a lot of late nights, but it's finally done!",
    isSent: true,
  },
  {
    id: "3",
    message:
      "Oh wow, that sounds like a big accomplishment. What was the project about?",
    isSent: false,
  },
  {
    id: "2",
    message:
      "I've been great, thanks for asking! Just wrapped up a huge project at work.",
    isSent: true,
  },
  {
    id: "1",
    message: "Hey, how have you been?",
    isSent: false,
  },
];

const userlist = [
  {
    id: "1",
    name: "Francois",
    image: "https://api.samplefaces.com/face?width=150&n=1",
    isOnline: true,
    unreadMessages: 2,
    messageList: messages,
    time: "8:00 PM",
  },
  {
    id: "2",
    name: "James",
    image: "https://api.samplefaces.com/face?width=150&n=2",
    isOnline: false,
    unreadMessages: 3,
    messageList: messages,
    time: "7:00 PM",
  },
  {
    id: "3",
    name: "John",
    image: "https://api.samplefaces.com/face?width=150&n=3",
    isOnline: true,
    unreadMessages: 0,
    messageList: messages,
    time: "6:00 PM",
  },
  {
    id: "4",
    name: "Alice",
    image: "https://api.samplefaces.com/face?width=150&n=4",
    isOnline: true,
    unreadMessages: 0,
    messageList: messages,
    time: "5:00 PM",
  },
  {
    id: "5",
    name: "Bob",
    image: "https://api.samplefaces.com/face?width=150&n=5",
    isOnline: false,
    unreadMessages: 0,
    messageList: messages,
    time: "4:00 PM",
  },
  {
    id: "6",
    name: "Charlie",
    image: "https://api.samplefaces.com/face?width=150&n=6",
    isOnline: true,
    unreadMessages: 2,
    messageList: messages,
    time: "3:00 PM",
  },
  {
    id: "7",
    name: "David",
    image: "https://api.samplefaces.com/face?width=150&n=7",
    isOnline: false,
    unreadMessages: 0,
    messageList: messages,
    time: "2:00 PM",
  },
  {
    id: "8",
    name: "Eve",
    image: "https://api.samplefaces.com/face?width=150&n=8",
    isOnline: true,
    unreadMessages: 0,
    messageList: messages,
    time: "1:00 PM",
  },
  {
    id: "9",
    name: "Frank",
    image: "https://api.samplefaces.com/face?width=150&n=9",
    isOnline: false,
    unreadMessages: 2,
    messageList: messages,
    time: "12:00 PM",
  },
  {
    id: "10",
    name: "Grace",
    image: "https://api.samplefaces.com/face?width=150&n=10",
    isOnline: true,
    unreadMessages: 0,
    messageList: messages,
    time: "11:00 AM",
  },
  {
    id: "11",
    name: "Heidi",
    image: "https://api.samplefaces.com/face?width=150&n=11",
    isOnline: false,
    unreadMessages: 1,
    messageList: messages,
    time: "10:00 AM",
  },
  {
    id: "12",
    name: "Ivan",
    image: "https://api.samplefaces.com/face?width=150&n=12",
    isOnline: true,
    unreadMessages: 0,
    messageList: messages,
    time: "9:00 AM",
  },
];

export default {
  messages,
  userlist,
};
