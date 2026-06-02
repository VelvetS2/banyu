import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Layers, MapPinned, TentTree } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
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
        title: 'Evakuasi',
        href: '/evakuasi',
        icon: TentTree,
    },
    {
        title: 'Legenda',
        href: '/legenda',
        icon: Layers,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Tentang Banyu',
        href: '/tentang',
        icon: BookOpen,
    },
];

export function SiteSidebar() {
    const { isCurrentUrl } = useCurrentUrl();
    const appName = usePage().props.name ?? 'Banyu';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="gap-0">
                <SidebarMenu className="gap-0">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            tooltip={{ children: appName }}
                        >
                            <Link href="/" prefetch>
                                <span
                                    className="flex aspect-square size-8 items-center justify-center rounded-md text-white"
                                    style={{ backgroundColor: '#dc143c' }}
                                >
                                    <span className="text-sm font-bold">
                                        B
                                    </span>
                                </span>
                                <span className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {appName}
                                    </span>
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="gap-0">
                    {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    <item.icon className="size-4" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu className="gap-0">
                    {footerNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    <item.icon className="size-4" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default SiteSidebar;
