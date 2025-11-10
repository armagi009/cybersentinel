import { useParams } from 'react-router-dom';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { CyberSentinelLayout } from '@/components/layout/CyberSentinelLayout';
import { Toaster } from '@/components/ui/sonner';
export function QuestionnairePage() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    // Or redirect to dashboard
    return (
      <CyberSentinelLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Invalid questionnaire session.</p>
        </div>
      </CyberSentinelLayout>
    );
  }
  return (
    <CyberSentinelLayout>
      <ChatInterface sessionId={id} />
      <Toaster richColors closeButton />
    </CyberSentinelLayout>
  );
}