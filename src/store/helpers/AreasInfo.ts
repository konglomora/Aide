interface IAreasInfo {
    [key: string]: {
        opsManagerName: string
        opsManagerTelegramNick: string
        areaOnionCodes: string[]
    }
}

export const areasInfo: IAreasInfo = {
    A1: {
        opsManagerName: 'Olha Fionova',
        opsManagerTelegramNick: '@Omorfiya',
        areaOnionCodes: ['KHA', 'CHE', 'POL', 'SUM', 'KRM', 'SLV'],
    },
    A2: {
        opsManagerName: 'Sergey Serezhenko',
        opsManagerTelegramNick: '@sportsmenserega',
        areaOnionCodes: [
            'DNP',
            'KRO',
            'KRR',
            'ZPR',
            'KRK',
            'MPL',
            'BDK',
            'KAM',
        ],
    },
    A3: {
        opsManagerName: 'Dmitry Tukan',
        opsManagerTelegramNick: '@Дмитрий',
        areaOnionCodes: ['ODS', 'ODE', 'MKL', 'KHE', 'CHS'],
    },
    A4: {
        opsManagerName: 'Roman Protsiv',
        opsManagerTelegramNick: '@protsiv_roman',
        areaOnionCodes: [
            'LVI',
            'IVF',
            'CHN',
            'RVN',
            'TNP',
            'LUT',
            'UZH',
            'TRK',
            'DRH',
        ],
    },
    A5: {
        opsManagerName: 'Dmitry Tukan',
        opsManagerTelegramNick: '@Дмитрий',
        areaOnionCodes: ['BTA', 'VNT', 'CHK', 'ZHY', 'KHM', 'UMA', 'KPD'],
    },
    KIEV: {
        opsManagerName: 'Oleksiy Shulyak',
        opsManagerTelegramNick: '@Oleksiy',
        areaOnionCodes: ['KIE', 'KYI', 'BRO', 'BOR', 'VSG', 'IRP'],
    },
}
