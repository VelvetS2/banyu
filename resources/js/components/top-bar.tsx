import { Link } from '@inertiajs/react';
import { Bell, Moon, PanelLeft, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type Props = {
    appName?: string;
};

export function TopBar({ appName = 'Banyu' }: Props) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const [query, setQuery] = useState('');
    const { toggleSidebar } = useSidebar();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Pencarian akan diimplementasikan bersama fitur peta (Tahap 3).
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
            <div className="mx-auto flex h-16 w-full items-center gap-3 px-4 md:max-w-7xl">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <span
                        className="flex aspect-square size-8 items-center justify-center rounded-md text-white"
                        style={{ backgroundColor: '#dc143c' }}
                    >
                        <AppLogoIcon className="size-5 fill-current text-white" />
                    </span>
                    <span className="hidden text-base sm:inline">
                        {appName}
                    </span>
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className="mx-2 flex flex-1 items-center"
                    role="search"
                >
                    <label htmlFor="topbar-search" className="sr-only">
                        Cari
                    </label>
                    <div className="relative w-full max-w-xl">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
                        <Input
                            id="topbar-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Cari kecamatan, kabupaten, atau lokasi evakuasi..."
                            className={cn(
                                'h-10 w-full pl-9',
                                'bg-neutral-100 dark:bg-neutral-900',
                                'border-neutral-200 dark:border-neutral-800',
                            )}
                        />
                    </div>
                </form>

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-10"
                        aria-label="Buka atau tutup sidebar"
                        onClick={toggleSidebar}
                    >
                        <PanelLeft className="size-5" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-10"
                        aria-label={
                            isDark
                                ? 'Beralih ke mode terang'
                                : 'Beralih ke mode gelap'
                        }
                        onClick={() =>
                            updateAppearance(isDark ? 'light' : 'dark')
                        }
                    >
                        {isDark ? (
                            <Sun className="size-5" />
                        ) : (
                            <Moon className="size-5" />
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-10"
                        aria-label="Notifikasi"
                    >
                        <Bell className="size-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default TopBar;
