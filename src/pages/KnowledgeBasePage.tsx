import { CyberSentinelLayout } from '@/components/layout/CyberSentinelLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, FileCheck2, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const mockKnowledgeBase = [
  { id: 'KB-001', question: 'Do you enforce multi-factor authentication (MFA) for all remote network access?', answer: 'Yes', evidence: 'MFA Policy.pdf', category: 'Access Control', lastUpdated: '2024-07-10' },
  { id: 'KB-002', question: 'Do you have a formal incident response plan?', answer: 'Yes', evidence: 'Incident Response Plan v1.2.docx', category: 'Incident Response', lastUpdated: '2024-06-15' },
  { id: 'KB-003', question: 'Is all sensitive data encrypted at rest?', answer: 'Yes', evidence: 'Encryption Standards.pdf', category: 'Data Encryption', lastUpdated: '2024-07-01' },
  { id: 'KB-004', question: 'Do you conduct regular security awareness training for all employees?', answer: 'Yes', evidence: 'Training Completion Records Q2.csv', category: 'Security Awareness', lastUpdated: '2024-07-20' },
  { id: 'KB-005', question: 'Are vulnerability scans performed regularly?', answer: 'Yes, quarterly', evidence: 'Latest Scan Report.pdf', category: 'Vulnerability Management', lastUpdated: '2024-05-25' },
];
export function KnowledgeBasePage() {
  return (
    <CyberSentinelLayout>
      <div className="max-w-7xl mx-auto py-8 md:py-10 lg:py-12 w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Security Knowledge Base</h1>
            <p className="text-lg text-muted-foreground">A centralized repository of your company's security posture.</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Answer Repository</CardTitle>
              <CardDescription>Search, review, and manage all previously provided answers and evidence.</CardDescription>
              <div className="relative pt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search questions or answers..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Evidence</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockKnowledgeBase.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-md truncate">{item.question}</TableCell>
                      <TableCell>
                        <Badge variant={item.answer === 'Yes' ? 'default' : 'secondary'} className={item.answer === 'Yes' ? 'bg-success hover:bg-success/90' : ''}>{item.answer}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4" />
                        {item.evidence}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </CyberSentinelLayout>
  );
}