import { CyberSentinelLayout } from '@/components/layout/CyberSentinelLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <CyberSentinelLayout>
      <DashboardPage />
      <Toaster richColors closeButton />
    </CyberSentinelLayout>
  );
}