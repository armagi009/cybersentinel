import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';
import { ChatMessage } from './ChatMessage';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
export function ChatInterface() {
  const messages = useChatStore((s) => s.messages);
  const status = useChatStore((s) => s.status);
  const addUserMessage = useChatStore((s) => s.addUserMessage);
  const startOnboarding = useChatStore((s) => s.startOnboarding);
  const currentFlow = useChatStore((s) => s.currentFlow);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!currentFlow) {
      startOnboarding();
    }
  }, [currentFlow, startOnboarding]);
  useEffect(() => {
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);
  }, [messages]);
  const lastMessage = messages[messages.length - 1];
  const options = lastMessage?.role === 'assistant' && lastMessage.options;
  return (
    <div className="flex flex-col h-full bg-card border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-foreground">CyberSentinel AI Agent</h2>
        <p className="text-sm text-muted-foreground">Your guide to cybersecurity due diligence.</p>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {status === 'thinking' && (
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
                <span className="text-sm">Thinking...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {status === 'user_input' && options && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  onClick={() => addUserMessage(option)}
                  className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
                >
                  {option}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}