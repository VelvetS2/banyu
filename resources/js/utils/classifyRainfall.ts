export type RainfallLevel = 1 | 2 | 3 | 4 | 5;

export type RainfallClassification = {
    warna: string;
    status: string;
    level: RainfallLevel;
};

const LEVELS: ReadonlyArray<{
    test: (mmPerJam: number) => boolean;
    warna: string;
    status: string;
    level: RainfallLevel;
}> = [
    {
        test: (mm) => mm < 10,
        warna: '#22c55e',
        status: 'Tidak hujan / gerimis, aman',
        level: 1,
    },
    {
        test: (mm) => mm < 20,
        warna: '#eab308',
        status: 'Hujan sedang, pantau kondisi',
        level: 2,
    },
    {
        test: (mm) => mm < 50,
        warna: '#f97316',
        status: 'Hujan deras, waspada',
        level: 3,
    },
    {
        test: (mm) => mm < 100,
        warna: '#ec4899',
        status: 'Hujan sangat lebat, siaga',
        level: 4,
    },
    {
        test: () => true,
        warna: '#dc143c',
        status: 'Ekstrem, potensi banjir tinggi',
        level: 5,
    },
];

export function classifyRainfall(mmPerJam: number): RainfallClassification {
    const level = LEVELS.find((entry) => entry.test(mmPerJam));
    if (!level) {
        throw new Error('Tidak ada level klasifikasi yang cocok');
    }
    return {
        warna: level.warna,
        status: level.status,
        level: level.level,
    };
}
