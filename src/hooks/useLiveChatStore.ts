import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { chatService } from '@/lib/chat';
import type { Message } from '../../worker/types';
import { toast } from 'sonner';
type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error';
type LiveChatState = {
  sessionId: string | null;
  messages: Message[];
  status: ChatStatus;
  streamingMessage: string;
};
type LiveChatActions = {
  initSession: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => Promise<void>;
};
export const useLiveChatStore = create<LiveChatState & LiveChatActions>()(
  immer((set, get) => ({
    sessionId: null,
    messages: [],
    status: 'idle',
    streamingMessage: '',
    initSession: async (sessionId: string) => {
      set({ status: 'loading', sessionId, messages: [], streamingMessage: '' });
      chatService.switchSession(sessionId);
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        set({ messages: response.data.messages, status: 'idle' });
      } else {
        toast.error('Failed to load chat history.');
        set({ status: 'error' });
      }
    },
    sendMessage: async (message: string) => {
      if (get().status === 'loading' || get().status === 'streaming' || !message.trim()) {
        return;
      }
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };
      set((state) => {
        state.messages.push(userMessage);
        state.status = 'streaming';
        state.streamingMessage = '';
      });
      await chatService.sendMessage(message, undefined, (chunk) => {
        set((state) => {
          state.streamingMessage += chunk;
        });
      });
      // After streaming is complete, fetch the final state to get the full assistant message
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        set({ messages: response.data.messages, status: 'idle', streamingMessage: '' });
      } else {
        // If fetching fails, create a local error message
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry, I encountered an error and couldn\'t save my last response. Please try again.',
          timestamp: Date.now(),
        };
        set(state => {
            state.messages.push(errorMessage);
            state.status = 'error';
            state.streamingMessage = '';
        });
      }
    },
    clearChat: async () => {
        if (!get().sessionId) return;
        const response = await chatService.clearMessages();
        if (response.success) {
            set({ messages: [], status: 'idle' });
            toast.success('Conversation cleared.');
        } else {
            toast.error('Failed to clear conversation.');
        }
    }
  }))
);