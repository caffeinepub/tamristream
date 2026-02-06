import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Search, Users, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

export function MessagingCenter() {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: 'Amara Okafor',
      participantAvatar: '/assets/generated/african-filmmaker.jpg',
      lastMessage: 'Thanks for watching my latest film!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      participant: 'Kemi Adetiba',
      participantAvatar: '/assets/generated/african-musician-portrait.jpg',
      lastMessage: 'New music dropping soon!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
      isOnline: false
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Amara Okafor',
      senderAvatar: '/assets/generated/african-filmmaker.jpg',
      content: 'Hello! Thanks for your support!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isRead: true
    },
    {
      id: '2',
      sender: 'You',
      senderAvatar: '/assets/generated/african-youth-watching.jpg',
      content: 'Love your work! Keep it up!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success('Message sent!');
    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Messages</h2>
          </div>
          <p className="text-muted-foreground">
            Connect with creators and fellow fans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conv.id
                          ? 'bg-primary/10 border border-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conv.participantAvatar} />
                            <AvatarFallback>{conv.participant[0]}</AvatarFallback>
                          </Avatar>
                          {conv.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{conv.participant}</h4>
                            {conv.unreadCount > 0 && (
                              <Badge className="bg-primary text-primary-foreground">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="md:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.participantAvatar} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{conversations.find(c => c.id === selectedConversation)?.participant}</CardTitle>
                      <CardDescription>
                        {conversations.find(c => c.id === selectedConversation)?.isOnline ? 'Online' : 'Offline'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
