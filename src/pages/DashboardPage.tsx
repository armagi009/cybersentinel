import { StartQuestionnaire } from '@/components/dashboard/StartQuestionnaire';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Clock } from 'lucide-react';
const mockMetrics = [
  { title: 'In Progress', value: 1, icon: Clock, color: 'text-blue-500' },
  { title: 'Completed', value: 4, icon: CheckCircle, color: 'text-green-500' },
  { title: 'Total', value: 5, icon: FileText, color: 'text-slate-500' },
];
export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 md:py-10 lg:py-12 w-full">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-lg text-muted-foreground">Here's an overview of your cybersecurity due diligence.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {mockMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">questionnaires</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <StartQuestionnaire />
      </div>
    </div>
  );
}