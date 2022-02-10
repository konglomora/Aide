export interface IOnionCodes {
    kyiv: string[]
    mio: string[]
    small: string[]
}

export const OnionCodes = {
    kyiv: ['KIE', 'KYI'],
    mio: ['DNP', 'KHA', 'LVI', 'ODS'],
    small: [
        'BDK',
        'BOR',
        'BRO',
        'BTA',
        'CHE',
        'CHN',
        'CHS',
        'CHK',
        'DRH',
        'IRP',
        'IVF',
        'KAM',
        'KHE',
        'KHM',
        'KPD',
        'KRK',
        'KRO',
        'KRR',
        'KRM',
        'KRU',
        'LUT',
        'MKL',
        'MPL',
        'ODE',
        'POL',
        'RVN',
        'SUM',
        'TRK',
        'TNP',
        'UMA',
        'UZH',
        'VNT',
        'ZHY',
        'ZPR',
    ],
    outside: ['CAS', 'TBI', 'ALA', 'ABN', 'NBO', 'RBT', 'BAT', 'NUR', 'ABJ'],
}

export const allOnionCodes: string[] = [
    ...OnionCodes.kyiv,
    ...OnionCodes.mio,
    ...OnionCodes.small,
    ...OnionCodes.outside,
]
