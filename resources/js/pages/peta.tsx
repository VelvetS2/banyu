import { Head } from '@inertiajs/react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { peta } from '@/routes';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL(
        'leaflet/dist/images/marker-icon-2x.png',
        import.meta.url,
    ).toString(),
    iconUrl: new URL(
        'leaflet/dist/images/marker-icon.png',
        import.meta.url,
    ).toString(),
    shadowUrl: new URL(
        'leaflet/dist/images/marker-shadow.png',
        import.meta.url,
    ).toString(),
});

export default function Peta() {
    return (
        <>
            <Head title="Peta" />
            <div className="flex h-svh flex-1 flex-col overflow-hidden">
                <div className="relative min-h-0 flex-1">
                    <MapContainer
                        center={[-4.5, 105.4]}
                        zoom={8}
                        scrollWheelZoom
                        className="absolute inset-0 size-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            </div>
        </>
    );
}

Peta.layout = {
    breadcrumbs: [
        {
            title: 'Peta',
            href: peta(),
        },
    ],
};
