import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { onboardingFlow } from '@/lib/onboarding-flow';
import { mockQuestionnaire } from '@/lib/mock-questionnaire';
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  options?: string[];
  jargon?: { term: string; explanation: string };
};
type ChatFlow = 'onboarding' | 'questionnaire';
type ChatState = {
  messages: Message[];
  status: 'idle' | 'thinking' | 'user_input';
  currentFlow: ChatFlow | null;
  currentStep: number;
};
type ChatActions = {
  startOnboarding: () => void;
  startQuestionnaire: () => void;
  addUserMessage: (content: string) => void;
  _processNextStep: () => void;
  _addBotMessage: (message: Omit<Message, 'id' | 'role'>) => void;
};
export const useChatStore = create<ChatState & ChatActions>()(
  immer((set, get) => ({
    messages: [],
    status: 'idle',
    currentFlow: null,
    currentStep: 0,
    startOnboarding: () => {
      set((state) => {
        state.messages = [];
        state.status = 'thinking';
        state.currentFlow = 'onboarding';
        state.currentStep = 0;
      });
      setTimeout(() => get()._processNextStep(), 1000);
    },
    startQuestionnaire: () => {
      set((state) => {
        state.messages.push({
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "Great! Let's begin the questionnaire.",
        });
        state.status = 'thinking';
        state.currentFlow = 'questionnaire';
        state.currentStep = 0;
      });
      setTimeout(() => get()._processNextStep(), 1500);
    },
    addUserMessage: (content: string) => {
      if (get().status !== 'user_input') return;
      set((state) => {
        state.messages.push({ id: crypto.randomUUID(), role: 'user', content });
        state.status = 'thinking';
      });
      setTimeout(() => get()._processNextStep(), 1500);
    },
    _addBotMessage: (message) => {
      set((state) => {
        state.messages.push({
          ...message,
          id: crypto.randomUUID(),
          role: 'assistant',
        });
      });
    },
    _processNextStep: () => {
      const { currentFlow, currentStep } = get();
      const flowData = currentFlow === 'onboarding' ? onboardingFlow : mockQuestionnaire;
      if (currentStep >= flowData.length) {
        if (currentFlow === 'onboarding') {
          get().startQuestionnaire();
        } else {
          set((state) => {
            state.status = 'idle';
            state.messages.push({
              id: crypto.randomUUID(),
              role: 'assistant',
              content: "You've completed the questionnaire! Your report is being generated.",
            });
          });
        }
        return;
      }
      const step = flowData[currentStep];
      get()._addBotMessage(step);
      set((state) => {
        state.currentStep += 1;
        state.status = step.options ? 'user_input' : 'thinking';
      });
      if (!step.options) {
        setTimeout(() => get()._processNextStep(), 1500 + Math.random() * 500);
      }
    },
  }))
);