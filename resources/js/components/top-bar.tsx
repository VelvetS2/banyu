import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type Props = {
    appName?: string;
};

export function TopBar({ appName = 'Banyu' }: Props) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const [query, setQuery] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Pencarian akan diimplementasikan bersama fitur peta (Tahap 3).
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-[#F3F4F6] text-neutral-900 dark:border-neutral-800 dark:bg-[#171717] dark:text-neutral-100">
            <div className="mx-auto flex h-16 w-full items-center gap-3 px-4 md:max-w-7xl">
                <form
                    onSubmit={handleSubmit}
                    className="group/form mx-2 flex flex-1 items-center"
                    role="search"
                >
                    <label htmlFor="topbar-search" className="sr-only">
                        Cari
                    </label>
                    <div className="relative w-full max-w-xl">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500 transition-colors duration-200 group-hover/form:text-[#dc143c] group-focus-within/form:text-[#dc143c] dark:text-neutral-400" />
                        <Input
                            id="topbar-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Cari kecamatan, kabupaten, atau lokasi evakuasi..."
                            className={cn(
                                'h-10 w-full pl-9 transition-[color,box-shadow,border-color] duration-200',
                                'border-neutral-200 hover:border-[#dc143c] focus-visible:border-[#dc143c] focus-visible:ring-[#dc143c]/30',
                                'dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#dc143c] dark:focus-visible:border-[#dc143c] dark:focus-visible:ring-[#dc143c]/50',
                                'bg-neutral-100',
                            )}
                        />
                    </div>
                </form>

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="group size-10 transition-colors duration-200 hover:bg-[#dc143c] hover:text-white"
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
                            <Sun className="size-5 transition-transform duration-200 group-hover:scale-110" />
                        ) : (
                            <Moon className="size-5 transition-transform duration-200 group-hover:scale-110" />
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="group size-10 transition-colors duration-200 hover:bg-[#dc143c] hover:text-white"
                        aria-label="Notifikasi"
                    >
                        <Bell className="size-5 transition-transform duration-200 group-hover:scale-110" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default TopBar;
