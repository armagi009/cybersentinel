import { CyberSentinelLayout } from '@/components/layout/CyberSentinelLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <CyberSentinelLayout>
      <ChatInterface />
      <Toaster richColors closeButton />
    </CyberSentinelLayout>
  );
}