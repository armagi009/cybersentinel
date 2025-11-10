import { CyberSentinelLayout } from '@/components/layout/CyberSentinelLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
export function SettingsPage() {
  return (
    <CyberSentinelLayout>
      <div className="max-w-7xl mx-auto py-8 md:py-10 lg:py-12 w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
            <p className="text-lg text-muted-foreground">Manage your account and application settings.</p>
          </div>
          <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
            <Settings className="w-16 h-16 text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription className="mt-2 max-w-md">
              We're working hard to bring you a comprehensive settings page. Soon you'll be able to manage your profile, notifications, and more.
            </CardDescription>
          </Card>
        </div>
      </div>
    </CyberSentinelLayout>
  );
}