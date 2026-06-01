import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { TopBar } from '@/components/top-bar';
import type { AppLayoutProps } from '@/types';

export default function BanyuLayout({ children }: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <TopBar />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
