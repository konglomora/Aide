export const kyivCodes: string[] = ['KIE', 'KYI']
export const mioCodes: string[] = ['DNP', 'KHA', 'LVI', 'ODS']
export const smallCodes: string[] = [
    'BRO',
    'BTA',
    'CHE',
    'CHN',
    'CHK',
    'IRP',
    'IVF',
    'KAM',
    'KHE',
    'KHM',
    'KRK',
    'KRO',
    'KRR',
    'LUT',
    'MKL',
    'MPL',
    'ODE',
    'POL',
    'RVN',
    'SUM',
    'TNP',
    'UMA',
    'UZH',
    'VNT',
    'ZHY',
    'ZPR',
]

export interface IOnionCodes {
    kyiv: string[]
    mio: string[]
    small: []
}

export const OnionCodes = {
    kyiv: kyivCodes,
    mio: mioCodes,
    small: smallCodes,
}
