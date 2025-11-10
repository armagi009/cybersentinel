import {
  ShieldCheck,
  FileText,
  BarChart2,
  Settings,
  LifeBuoy,
  Database,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
const navItems = [
  { icon: ShieldCheck, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Questionnaires', href: '/questionnaire/new' }, // Example link
  { icon: BarChart2, label: 'Reports', href: '/reports' },
  { icon: Database, label: 'Knowledge Base', href: '/knowledge-base' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];
export function AppSidebar() {
  return (
    <aside className="h-screen w-80 flex-col border-r bg-background p-4 hidden lg:flex">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
          <ShieldCheck className="size-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground">CyberSentinel</h1>
      </div>
      <nav className="flex-1 flex flex-col">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center w-full justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        )
                      }
                    >
                      <item.icon className="size-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
        <div className="mt-auto">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
              Our AI agent is here to assist you 24/7.
              <Button size="sm" className="w-full mt-3">
                <LifeBuoy className="mr-2 size-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </nav>
      <footer className="mt-4 text-center text-xs text-muted-foreground">
        <p>Built with ���️ at Cloudflare</p>
        <p className="mt-1">Note: AI requests may be rate-limited.</p>
      </footer>
    </aside>
  );
}