import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import type { Message } from '@/hooks/useChatStore';
type ChatMessageProps = {
  message: Message;
};
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const renderContentWithJargon = (content: string, jargon?: { term: string; explanation: string }) => {
    if (!jargon) {
      return content;
    }
    const parts = content.split(new RegExp(`(${jargon.term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === jargon.term.toLowerCase() ? (
        <HoverCard key={index} openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-primary font-semibold underline decoration-dotted decoration-primary/50 cursor-help">
              {part}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 text-sm" side="top">
            <h4 className="font-bold mb-2 text-primary">{jargon.term}</h4>
            <p className="text-muted-foreground">{jargon.explanation}</p>
          </HoverCardContent>
        </HoverCard>
      ) : (
        part
      )
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex items-start gap-3', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Bot className="size-5" />
        </div>
      )}
      <div
        className={cn(
          'max-w-md rounded-2xl px-4 py-3',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-accent text-accent-foreground rounded-bl-none'
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {renderContentWithJargon(message.content, message.jargon)}
        </p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 size-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
          <User className="size-5" />
        </div>
      )}
    </motion.div>
  );
}