import { Head } from '@inertiajs/react';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
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

type KecamatanProperties = {
    id: string;
    kecamatan: string;
    kabupaten: string;
};

type KecamatanFeature = GeoJSON.Feature<GeoJSON.Geometry, KecamatanProperties>;
type KecamatanCollection = GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    KecamatanProperties
>;

const BATAS_STYLE: L.StyleFunction = () => ({
    color: '#6b7280',
    weight: 1,
    fillColor: 'transparent',
    fillOpacity: 0,
});

export default function Peta() {
    const [kecamatan, setKecamatan] = useState<KecamatanCollection | null>(
        null,
    );

    useEffect(() => {
        let cancelled = false;
        fetch('/lampung_kecamatan.geojson')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Gagal memuat GeoJSON kecamatan');
                }
                return response.json();
            })
            .then((data: KecamatanCollection) => {
                if (!cancelled) {
                    setKecamatan(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            cancelled = true;
        };
    }, []);

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
                        {kecamatan && (
                            <GeoJSON
                                key={kecamatan.features.length}
                                data={kecamatan as unknown as GeoJSON.GeoJsonObject}
                                style={BATAS_STYLE as L.StyleFunction}
                            />
                        )}
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
