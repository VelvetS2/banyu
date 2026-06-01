import { Head } from '@inertiajs/react';
import BanyuLayout from '@/layouts/banyu-layout';

const BANYU_BRAND = '#dc143c';

export default function Welcome() {
    return (
        <BanyuLayout>
            <Head title="Banyu — Mitigasi Banjir Lampung" />
            <div className="min-h-[calc(100vh-4rem)] w-full bg-[#F3F4F6] dark:bg-neutral-900">
                <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-16 text-center">
                    <span
                        className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider text-white"
                        style={{ backgroundColor: BANYU_BRAND }}
                    >
                        Mitigasi Banjir
                    </span>
                    <h1 className="max-w-3xl text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
                        Pantau Curah Hujan &amp; Lokasi Evakuasi
                        <br />
                        <span style={{ color: BANYU_BRAND }}>
                            Provinsi Lampung
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base text-neutral-700 sm:text-lg">
                        Sistem pemantau bencana banjir berbasis web yang
                        menampilkan peta interaktif 229 kecamatan di Lampung,
                        menggabungkan data BMKG dan Open-Meteo untuk peringatan
                        dini serta daftar lokasi evakuasi terdekat.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                        <a
                            href="/peta"
                            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                            style={{ backgroundColor: BANYU_BRAND }}
                        >
                            Buka Peta Interaktif
                        </a>
                        <a
                            href="#fitur"
                            className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
                        >
                            Pelajari Fitur
                        </a>
                    </div>
                </section>

                <section
                    id="fitur"
                    className="mx-auto w-full max-w-7xl px-6 pb-20"
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: '229 Kecamatan',
                                desc: 'Peta poligon per kecamatan dengan pewarnaan intensitas curah hujan.',
                            },
                            {
                                title: 'Sumber Ganda',
                                desc: 'Data BMKG (kabupaten) + Open-Meteo (kecamatan) dipakai bersamaan.',
                            },
                            {
                                title: 'Lokasi Evakuasi',
                                desc: 'Titik evakuasi resmi dengan detail alamat dan kapasitas.',
                            },
                            {
                                title: 'Mode Gelap',
                                desc: 'Tersedia mode terang dan gelap dengan preferensi tersimpan.',
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
                            >
                                <div
                                    className="mb-3 h-1 w-10 rounded-full"
                                    style={{ backgroundColor: BANYU_BRAND }}
                                />
                                <h3 className="text-base font-semibold text-neutral-900">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-sm text-neutral-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="border-t border-neutral-200/70 bg-white/40 py-6 text-center text-sm text-neutral-600">
                    © {new Date().getFullYear()} Banyu — Mitigasi Banjir
                    Provinsi Lampung
                </footer>
            </div>
        </BanyuLayout>
    );
}
