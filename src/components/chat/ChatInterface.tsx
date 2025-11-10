import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, Bot, Trash2 } from 'lucide-react';
import { useLiveChatStore } from '@/hooks/useLiveChatStore';
import { ChatMessage } from './ChatMessage';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
type ChatInterfaceProps = {
  sessionId: string;
};
export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // Zustand selectors
  const initSession = useLiveChatStore((s) => s.initSession);
  const sendMessage = useLiveChatStore((s) => s.sendMessage);
  const clearChat = useLiveChatStore((s) => s.clearChat);
  const messages = useLiveChatStore((s) => s.messages);
  const status = useLiveChatStore((s) => s.status);
  const streamingMessage = useLiveChatStore((s) => s.streamingMessage);
  useEffect(() => {
    if (sessionId) {
      initSession(sessionId);
    }
  }, [sessionId, initSession]);
  useEffect(() => {
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);
  }, [messages, streamingMessage]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'streaming' || status === 'loading') return;
    sendMessage(input);
    setInput('');
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className="flex flex-col h-full bg-card border rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">CyberSentinel AI Agent</h2>
          <p className="text-sm text-muted-foreground">Your guide to cybersecurity due diligence.</p>
        </div>
        <Button variant="outline" size="icon" onClick={clearChat} title="Clear conversation">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {streamingMessage && (
            <div className="flex items-start gap-3 justify-start">
              <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="size-5" />
              </div>
              <div className="max-w-md rounded-2xl px-4 py-3 bg-accent text-accent-foreground rounded-bl-none">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {streamingMessage}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          )}
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="size-5" />
              </div>
              <div className="max-w-md rounded-2xl px-4 py-3 bg-accent text-accent-foreground rounded-bl-none flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-sm">Loading chat...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a clarifying question or provide an answer..."
            className="flex-1 min-h-[42px] max-h-48 resize-none"
            rows={1}
            disabled={status === 'streaming' || status === 'loading'}
          />
          <Button type="submit" disabled={!input.trim() || status === 'streaming' || status === 'loading'}>
            {status === 'streaming' ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}