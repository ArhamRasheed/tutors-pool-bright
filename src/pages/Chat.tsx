// import { useState } from "react"
// import { Send, Mic, Paperclip, Search, MoreVertical } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"

// interface Contact {
//   id: number
//   name: string
//   role: "student" | "tutor"
//   lastMessage: string
//   timestamp: string
//   unread: number
//   online: boolean
// }

// interface Message {
//   id: number
//   sender: "me" | "other"
//   content: string
//   timestamp: string
//   type: "text" | "voice"
// }

// const contacts: Contact[] = [
//   {
//     id: 1,
//     name: "Dr. Sarah Johnson",
//     role: "tutor",
//     lastMessage: "The calculus assignment looks good!",
//     timestamp: "2:30 PM",
//     unread: 2,
//     online: true
//   },
//   {
//     id: 2,
//     name: "Alex Chen",
//     role: "student",
//     lastMessage: "Can we reschedule tomorrow's session?",
//     timestamp: "1:45 PM",
//     unread: 0,
//     online: false
//   },
//   {
//     id: 3,
//     name: "Prof. Michael Davis",
//     role: "tutor",
//     lastMessage: "I've uploaded the physics notes",
//     timestamp: "12:20 PM",
//     unread: 1,
//     online: true
//   }
// ]

// const messages: Message[] = [
//   {
//     id: 1,
//     sender: "other",
//     content: "Hi! How did the practice problems go?",
//     timestamp: "2:25 PM",
//     type: "text"
//   },
//   {
//     id: 2,
//     sender: "me",
//     content: "They were challenging but I managed to solve most of them. I'm still stuck on problem 7.",
//     timestamp: "2:27 PM",
//     type: "text"
//   },
//   {
//     id: 3,
//     sender: "other",
//     content: "Great progress! Problem 7 involves integration by parts. Let me send you a helpful resource.",
//     timestamp: "2:29 PM",
//     type: "text"
//   },
//   {
//     id: 4,
//     sender: "other",
//     content: "The calculus assignment looks good!",
//     timestamp: "2:30 PM",
//     type: "text"
//   }
// ]

// export default function Chat() {
//   const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0])
//   const [message, setMessage] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")

//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       // In a real app, you would send the message here
//       console.log("Sending message:", message)
//       setMessage("")
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   return (
//     <div className="flex h-[calc(100vh-8rem)] bg-card rounded-lg border border-border overflow-hidden shadow-card">
//       {/* Contacts List */}
//       <div className="w-80 border-r border-border bg-muted/20">
//         <div className="p-4 border-b border-border">
//           <h2 className="text-lg font-semibold text-foreground mb-3">Messages</h2>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search conversations..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>
        
//         <div className="overflow-y-auto">
//           {filteredContacts.map((contact) => (
//             <div
//               key={contact.id}
//               onClick={() => setSelectedContact(contact)}
//               className={`p-4 border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/50 ${
//                 selectedContact.id === contact.id ? "bg-muted" : ""
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
//                     {contact.name.split(' ').map(n => n[0]).join('')}
//                   </div>
//                   {contact.online && (
//                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
//                     <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
//                     {contact.unread > 0 && (
//                       <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[1.25rem] h-5 flex items-center justify-center">
//                         {contact.unread}
//                       </span>
//                     )}
//                   </div>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     contact.role === "tutor" 
//                       ? "bg-primary/10 text-primary" 
//                       : "bg-accent/10 text-accent"
//                   }`}>
//                     {contact.role}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="p-4 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
//                   {selectedContact.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 {selectedContact.online && (
//                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
//                 )}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-foreground">{selectedContact.name}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {selectedContact.online ? "Online" : "Last seen 2h ago"}
//                 </p>
//               </div>
//             </div>
//             <Button variant="ghost" size="icon">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg) => (
//             <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
//               <div className={`max-w-[70%] p-3 rounded-lg ${
//                 msg.sender === "me"
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-muted text-foreground"
//               }`}>
//                 <p className="text-sm">{msg.content}</p>
//                 <p className={`text-xs mt-1 ${
//                   msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
//                 }`}>
//                   {msg.timestamp}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div className="p-4 border-t border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon">
//               <Paperclip className="h-4 w-4" />
//             </Button>
//             <div className="flex-1 relative">
//               <Input
//                 placeholder="Type a message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="pr-12"
//               />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-1 top-1/2 transform -translate-y-1/2"
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//             </div>
//             <Button onClick={handleSendMessage} variant="gradient" size="icon">
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }