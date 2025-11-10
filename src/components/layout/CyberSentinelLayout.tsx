import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
type CyberSentinelLayoutProps = {children: React.ReactNode;};
export function CyberSentinelLayout({ children }: CyberSentinelLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-muted/40 flex">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <AppSidebar />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2.5">
             <div className="size-7 bg-primary rounded-md flex items-center justify-center">
                <ShieldCheck className="size-4 text-primary-foreground" />
             </div>
             <h1 className="text-lg font-bold text-foreground">CyberSentinel</h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 flex">
          <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] lg:h-full">
            {children}
          </div>
        </main>
      </div>
      <ThemeToggle className="absolute top-4 right-4 z-50" />
    </div>);
}