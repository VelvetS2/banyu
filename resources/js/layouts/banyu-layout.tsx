import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { SiteSidebar } from '@/components/site-sidebar';
import { TopBar } from '@/components/top-bar';
import type { AppLayoutProps } from '@/types';

export default function BanyuLayout({ children }: AppLayoutProps) {
    return (
        <AppShell>
            <SiteSidebar />
            <div className="flex min-h-screen w-full flex-col">
                <TopBar />
                <AppContent variant="sidebar">{children}</AppContent>
            </div>
        </AppShell>
    );
}
