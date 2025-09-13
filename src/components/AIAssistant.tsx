import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { aiAssistant, type ChatMessage } from '@/lib/ai-assistant';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await aiAssistant.generateResponse(inputValue, messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: "Hello! I'm your AI assistant for Dots. I'm here to help you discover beautiful Indian handicrafts, learn about artisan stories, and find the perfect pieces for your needs. How can I assist you today?",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      initializeChat();
    }
  };

  const suggestedQuestions = aiAssistant.getSuggestedQuestions();

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-neonaccent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="h-full shadow-2xl border-0 bg-background">
              {/* Header */}
              <CardHeader className="p-4 bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-neonaccent rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg">Dots AI Assistant</h3>
                      <p className="text-xs text-primary-foreground/80">Your craft discovery companion</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0 flex flex-col h-[calc(100%-140px)]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground ml-2' 
                              : 'bg-neonaccent text-primary mr-2'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="w-3 h-3" />
                            ) : (
                              <Bot className="w-3 h-3" />
                            )}
                          </div>
                          <div className={`rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-foreground'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap font-paragraph">
                              {message.content}
                            </p>
                            <p className="text-xs opacity-60 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex">
                          <div className="w-6 h-6 rounded-full bg-neonaccent text-primary flex items-center justify-center mr-2">
                            <Bot className="w-3 h-3" />
                          </div>
                          <div className="bg-secondary rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-75" />
                              <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-150" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Suggested Questions */}
                    {messages.length === 1 && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <p className="text-xs text-foreground/60 font-paragraph">Try asking:</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedQuestions.slice(0, 3).map((question, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              {question}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about our crafts, artisans, or anything else..."
                      className="flex-1 text-sm font-paragraph"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}