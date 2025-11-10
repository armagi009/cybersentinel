import type { Message } from '@/hooks/useChatStore';
export const mockQuestionnaire: Omit<Message, 'id' | 'role'>[] = [
  {
    content: "Let's move to Access Control. Do you enforce multi-factor authentication (MFA) for all remote network access?",
    jargon: {
      term: "multi-factor authentication (MFA)",
      explanation: "This means your employees need a second form of verification, like a code from their phone, in addition to their password when working from home."
    },
    options: ["Yes", "No", "I don't know"],
  },
  {
    content: "If you use Google Workspace or Microsoft 365 with security defaults enabled, the answer is likely 'Yes'. What kind of evidence can you provide?",
    options: ["Screenshot of settings", "Policy document", "Not applicable"],
  },
  {
    content: "Next, regarding Incident Response. Do you have a formal, documented Incident Response Plan?",
    jargon: {
      term: "Incident Response Plan",
      explanation: "A document that outlines your organization's procedures for handling a security breach or cyberattack, from detection to recovery."
    },
    options: ["Yes, we have one", "No, we do not"],
  },
  {
    content: "That's okay if you don't. A key part of a plan is defining roles. To find out more, you might check with your IT support or leadership team to see who is responsible during a security event.",
  },
  {
    content: "Final question for this section: Is all sensitive data encrypted at rest?",
    jargon: {
      term: "encrypted at rest",
      explanation: "This refers to data that is not actively moving from device to device or network to network. It is stored on a hard drive, laptop, or in a database. Encryption makes it unreadable without the correct key."
    },
    options: ["Yes, fully", "Partially", "No"],
  },
];