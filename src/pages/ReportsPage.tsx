import { CyberSentinelLayout } from '@/components/layout/CyberSentinelLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileText, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const mockCompleted = [
  { id: 'Q-SOC2-2024', name: 'SOC 2 Type II Assessment', date: '2024-07-15', version: 'v1.2' },
  { id: 'Q-ISO-2024', name: 'ISO 27001 Certification', date: '2024-06-20', version: 'v1.0' },
  { id: 'Q-VSQ-ACME', name: 'Acme Corp Vendor Security', date: '2024-05-01', version: 'v2.1' },
];
const mockActionPlans = [
  { id: 'AP-001', title: 'Implement Formal Incident Response Plan', priority: 'High', status: 'In Progress', owner: 'IT Manager' },
  { id: 'AP-002', title: 'Conduct Annual Security Awareness Training', priority: 'Medium', status: 'Completed', owner: 'HR' },
  { id: 'AP-003', title: 'Enforce MFA for All Cloud Services', priority: 'High', status: 'Not Started', owner: 'IT Manager' },
  { id: 'AP-004', title: 'Establish Data Classification Policy', priority: 'Low', status: 'Completed', owner: 'Compliance' },
];
export function ReportsPage() {
  return (
    <CyberSentinelLayout>
      <div className="max-w-7xl mx-auto py-8 md:py-10 lg:py-12 w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Reports Center</h1>
            <p className="text-lg text-muted-foreground">View, manage, and download your generated reports and action plans.</p>
          </div>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="completed">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="completed">Completed Questionnaires</TabsTrigger>
                  <TabsTrigger value="action-plans">Internal Action Plans</TabsTrigger>
                </TabsList>
                <TabsContent value="completed" className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Completed On</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCompleted.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" />{report.name}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.version}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="action-plans" className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockActionPlans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-muted-foreground" />{plan.title}</TableCell>
                          <TableCell>
                            <Badge variant={plan.priority === 'High' ? 'destructive' : plan.priority === 'Medium' ? 'secondary' : 'outline'}>{plan.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={plan.status === 'Completed' ? 'default' : 'outline'} className={plan.status === 'Completed' ? 'bg-success hover:bg-success/90' : ''}>{plan.status}</Badge>
                          </TableCell>
                          <TableCell>{plan.owner}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </CyberSentinelLayout>
  );
}