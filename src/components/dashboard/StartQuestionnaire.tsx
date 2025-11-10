import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileText, UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { chatService } from '@/lib/chat';
const standardFrameworks = [
  { id: 'soc2', name: 'SOC 2' },
  { id: 'iso27001', name: 'ISO 27001' },
  { id: 'nist_csf', name: 'NIST CSF' },
  { id: 'vsq', name: 'Standard VSQ' },
];
export function StartQuestionnaire() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    const file = acceptedFiles[0];
    setIsProcessing(true);
    toast.info(`Parsing "${file.name}"... This may take a moment.`);
    // In a real app, you'd upload and parse the file.
    // Here, we'll simulate parsing and create a new session.
    await new Promise(resolve => setTimeout(resolve, 2000));
    const { success, data } = await chatService.createSession(`Custom: ${file.name}`);
    if (success && data) {
      toast.success(`Successfully parsed "${file.name}"!`);
      navigate(`/questionnaire/${data.sessionId}`);
    } else {
      toast.error('Failed to start a new session.');
    }
    setIsProcessing(false);
  }, [navigate]);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });
  const handleStartStandard = async () => {
    if (!selectedFramework) {
      toast.warning('Please select a framework to begin.');
      return;
    }
    setIsProcessing(true);
    const frameworkName = standardFrameworks.find(f => f.id === selectedFramework)?.name;
    const { success, data } = await chatService.createSession(`Standard: ${frameworkName}`);
    if (success && data) {
      navigate(`/questionnaire/${data.sessionId}`);
    } else {
      toast.error('Failed to start a new session.');
      setIsProcessing(false);
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Start a New Questionnaire</CardTitle>
        <CardDescription>Choose a standard framework or upload your own document to begin.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Framework</TabsTrigger>
            <TabsTrigger value="custom">Upload Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="standard" className="pt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select a common security framework.</p>
              <Select onValueChange={setSelectedFramework} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a framework..." />
                </SelectTrigger>
                <SelectContent>
                  {standardFrameworks.map((framework) => (
                    <SelectItem key={framework.id} value={framework.id}>
                      {framework.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleStartStandard} disabled={isProcessing || !selectedFramework} className="w-full">
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                Start with Selected Framework
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="custom" className="pt-6">
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 bg-background'}`}
            >
              <input {...getInputProps()} />
              {isProcessing ? (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="mt-4 text-sm text-muted-foreground">Processing your document...</p>
                </>
              ) : acceptedFiles.length > 0 ? (
                <>
                  <CheckCircle2 className="h-10 w-10 text-success" />
                  <p className="mt-4 font-medium text-foreground">{acceptedFiles[0].name}</p>
                  <p className="text-sm text-muted-foreground">File ready for processing.</p>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    {isDragActive ? 'Drop the file here...' : 'Drag & drop a file here, or click to select'}
                  </p>
                  <p className="text-xs text-muted-foreground/80">PDF or DOCX supported</p>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}