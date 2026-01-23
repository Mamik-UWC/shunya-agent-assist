'use client';

import * as React from 'react';
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/features/chat-assistant/types';

export interface AgentChatDockProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function AgentChatDock({
  messages = [],
  onSendMessage,
  className,
  position = 'bottom-right',
}: AgentChatDockProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className={cn(
          'fixed rounded-full h-14 w-14 shadow-lg z-50',
          positionClasses[position]
        )}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        'fixed w-80 shadow-xl z-50 flex flex-col',
        isMinimized ? 'h-auto' : 'h-[500px]',
        positionClasses[position],
        className
      )}
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Agent Chat
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <Maximize2 className="h-3 w-3" />
            ) : (
              <Minimize2 className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-4">
              <div ref={scrollRef} className="space-y-3 py-4">
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No messages yet. Start a conversation.
                  </p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-lg px-3 py-2 max-w-[80%] text-sm',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-4 space-y-2">
              <Textarea
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                className="resize-none"
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="w-full"
                disabled={!inputValue.trim()}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
