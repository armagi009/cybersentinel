import type { Message } from '@/hooks/useChatStore';
export const onboardingFlow: Omit<Message, 'id' | 'role'>[] = [
  {
    content: "Welcome to CyberSentinel. I'll help you prepare for your security review. Let's start by understanding your business.",
  },
  {
    content: "What industry do you operate in?",
    options: ["Healthcare", "FinTech", "E-commerce", "Professional Services"],
  },
  {
    content: "Understood. What type of sensitive data do you typically handle?",
    options: ["Customer PII", "Payment Card Info (PCI)", "Health Records (HIPAA)", "Intellectual Property"],
  },
  {
    content: "Based on your profile, common questionnaires will focus on standards like HIPAA and PCI-DSS. I will tailor my questions accordingly.",
  },
  {
    content: "Your Security Profile is now created. This will be used to customize all future interactions.",
  },
];