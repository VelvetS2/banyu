import { Head } from '@inertiajs/react';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import { rainfallDummy } from '@/data/rainfallDummy';
import { classifyRainfall } from '@/utils/classifyRainfall';
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

type KecamatanCollection = GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    KecamatanProperties
>;

const DEFAULT_RAINFALL = 0;

function styleKecamatan(
    feature: GeoJSON.Feature<GeoJSON.Geometry, KecamatanProperties> | undefined,
): L.PathOptions {
    const id = feature?.properties.id ?? '';
    const mmPerJam = rainfallDummy[id] ?? DEFAULT_RAINFALL;
    const { warna } = classifyRainfall(mmPerJam);

    return {
        color: '#6b7280',
        weight: 1,
        fillColor: warna,
        fillOpacity: 0.55,
    };
}

function popupContent(
    feature: GeoJSON.Feature<GeoJSON.Geometry, KecamatanProperties>,
): string {
    const { kecamatan, kabupaten } = feature.properties;
    const id = feature.properties.id;
    const mmPerJam = rainfallDummy[id] ?? DEFAULT_RAINFALL;
    const { warna, status } = classifyRainfall(mmPerJam);

    return `
        <div class="kecamatan-popup">
            <div class="kecamatan-popup__header">
                <span class="kecamatan-popup__dot" style="background-color: ${warna}"></span>
                <span class="kecamatan-popup__title">${kecamatan}</span>
            </div>
            <dl class="kecamatan-popup__list">
                <div><dt>Kabupaten</dt><dd>${kabupaten}</dd></div>
                <div><dt>Curah hujan</dt><dd>${mmPerJam.toFixed(1)} mm/jam</dd></div>
                <div><dt>Status</dt><dd>${status}</dd></div>
                <div><dt>Diperbarui</dt><dd>-</dd></div>
            </dl>
        </div>
    `;
}

function onEachKecamatan(
    feature: GeoJSON.Feature<GeoJSON.Geometry, KecamatanProperties>,
    layer: L.Layer,
): void {
    if (!(layer instanceof L.Path)) {
        return;
    }
    const popup = popupContent(feature);
    layer.bindPopup(popup);
    layer.on('mouseover', (event) => {
        const target = event.target as L.Path;
        target.setStyle({ weight: 2, color: '#dc143c' });
    });
    layer.on('mouseout', (event) => {
        const target = event.target as L.Path;
        target.setStyle({ weight: 1, color: '#6b7280' });
    });
}

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
                                style={styleKecamatan as L.StyleFunction}
                                onEachFeature={onEachKecamatan}
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
