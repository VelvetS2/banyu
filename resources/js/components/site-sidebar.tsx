import { Link, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    BarChart3,
    Cloud,
    MapPinned,
    MessageSquareWarning,
    Settings,
    TentTree,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

const mainNavItems: NavItem[] = [
    {
        title: 'Peta',
        href: '/peta',
        icon: MapPinned,
    },
    {
        title: 'Peringatan',
        href: '/peringatan',
        icon: AlertTriangle,
    },
    {
        title: 'Lapor Banjir',
        href: '/lapor',
        icon: MessageSquareWarning,
    },
    {
        title: 'Info Evakuasi',
        href: '/evakuasi',
        icon: TentTree,
    },
    {
        title: 'Statistik Data',
        href: '/statistik',
        icon: BarChart3,
    },
];

export function SiteSidebar() {
    const { isCurrentUrl } = useCurrentUrl();
    const appName = usePage().props.name ?? 'Banyu';

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r border-sidebar-border/60"
        >
            {/* HEADER — logo & nama website */}
            <SidebarHeader className="px-3 pt-4 pb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            tooltip={{ children: appName }}
                            className="h-14 rounded-xl px-3 hover:bg-transparent data-[state=open]:hover:bg-transparent"
                        >
                            <Link
                                href="/"
                                prefetch
                                className="group/logo flex min-w-0 items-center gap-3"
                            >
                                <span
                                    className="relative flex aspect-square size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-white shadow-md ring-1 ring-white/10"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #ef4444 0%, #dc143c 50%, #9f1239 100%)',
                                    }}
                                >
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
                                    />
                                    <span className="relative text-lg font-extrabold tracking-tight">
                                        B
                                    </span>
                                </span>
                                <span className="grid min-w-0 flex-1 text-left leading-tight">
                                    <span className="truncate text-lg font-bold tracking-tight text-foreground">
                                        {appName}
                                    </span>
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator className="mx-0 w-full" />

            {/* CONTENT — menu navigasi + cuaca */}
            <SidebarContent className="gap-0 overflow-x-hidden px-2 py-2">
                <SidebarGroup className="min-w-0 p-0">
                    <SidebarGroupLabel className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="min-w-0">
                        <SidebarMenu className="min-w-0 gap-0.5">
                            {mainNavItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isCurrentUrl(item.href)}
                                            tooltip={{ children: item.title }}
                                            className="group/menu-btn relative h-10 rounded-lg px-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent hover:text-red-700 data-[active=true]:bg-gradient-to-r data-[active=true]:from-red-100 data-[active=true]:to-red-50/40 data-[active=true]:font-semibold data-[active=true]:text-red-700 data-[active=true]:shadow-sm dark:hover:from-red-950/40 dark:hover:to-transparent dark:hover:text-white dark:data-[active=true]:from-red-950/50 dark:data-[active=true]:to-red-950/20 dark:data-[active=true]:text-white"
                                        >
                                            <Link
                                                href={item.href}
                                                prefetch
                                                className="flex min-w-0 items-center gap-3"
                                            >
                                                <span className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 rounded-r-full bg-red-600 transition-transform duration-200 ease-out group-hover/menu-btn:scale-y-100 group-data-[active=true]/menu-btn:scale-y-100" />
                                                <Icon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/menu-btn:scale-110 group-data-[active=true]/menu-btn:scale-110" />
                                                <span className="truncate transition-transform duration-200 ease-out group-hover/menu-btn:translate-x-0.5 group-data-[active=true]/menu-btn:translate-x-0.5">
                                                    {item.title}
                                                </span>
                                                <span className="ml-auto size-1.5 rounded-full bg-red-600 opacity-0 transition-opacity duration-200 group-hover/menu-btn:opacity-100 group-data-[active=true]/menu-btn:opacity-100" />
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="mx-0 my-2 w-full" />

                <SidebarGroup className="min-w-0 p-0">
                    <SidebarGroupLabel className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                        Cepat
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="min-w-0">
                        <SidebarMenu className="min-w-0 gap-0.5">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={{ children: 'Cuaca Sekarang' }}
                                    className="group/menu-btn relative h-10 rounded-lg px-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-gradient-to-r hover:from-sky-50 hover:to-transparent hover:text-sky-700 dark:hover:from-sky-950/40 dark:hover:to-transparent dark:hover:text-white"
                                >
                                    <Link
                                        href="/cuaca"
                                        prefetch
                                        className="flex min-w-0 items-center gap-3"
                                    >
                                        <span className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 rounded-r-full bg-sky-600 transition-transform duration-200 ease-out group-hover/menu-btn:scale-y-100" />
                                        <Cloud className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/menu-btn:scale-110 group-hover/menu-btn:-rotate-6" />
                                        <span className="truncate transition-transform duration-200 ease-out group-hover/menu-btn:translate-x-0.5">
                                            Cuaca Sekarang
                                        </span>
                                        <span className="ml-auto size-1.5 rounded-full bg-sky-600 opacity-0 transition-opacity duration-200 group-hover/menu-btn:opacity-100" />
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER — pengaturan */}
            <SidebarFooter className="px-2 pt-0 pb-3">
                <SidebarSeparator className="mx-0 mb-2 w-full" />
                <SidebarMenu className="min-w-0 gap-0.5">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip={{ children: 'Pengaturan' }}
                            className="group/menu-btn relative h-10 rounded-lg px-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-gradient-to-r hover:from-slate-100 hover:to-transparent hover:text-slate-900 dark:hover:from-slate-800/60 dark:hover:to-transparent dark:hover:text-slate-100"
                        >
                            <Link
                                href="/pengaturan"
                                prefetch
                                className="flex min-w-0 items-center gap-3"
                            >
                                <span className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 rounded-r-full bg-slate-600 transition-transform duration-200 ease-out group-hover/menu-btn:scale-y-100" />
                                <Settings className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover/menu-btn:scale-110 group-hover/menu-btn:rotate-45" />
                                <span className="truncate transition-transform duration-200 ease-out group-hover/menu-btn:translate-x-0.5">
                                    Pengaturan
                                </span>
                                <span className="ml-auto size-1.5 rounded-full bg-slate-600 opacity-0 transition-opacity duration-200 group-hover/menu-btn:opacity-100" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default SiteSidebar;
