import { OpsManagersTelegramNicks } from './OpsManagersData'

interface IAreasInfo {
    [key: string]: {
        opsManagerTelegramNick: string
        areaOnionCodes: string[]
    }
}

export const areasInfo: IAreasInfo = {
    A1: {
        opsManagerTelegramNick: OpsManagersTelegramNicks.OLHA_FIONOVA,
        areaOnionCodes: ['KHA', 'CHE', 'POL', 'SUM', 'KRM', 'SLV'],
    },
    A2: {
        opsManagerTelegramNick: OpsManagersTelegramNicks.SERGEY_SEREZHENKO,
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
        opsManagerTelegramNick: OpsManagersTelegramNicks.DMITRIY_TUKAN,
        areaOnionCodes: ['ODS', 'ODE', 'MKL', 'KHE', 'CHS'],
    },
    A4: {
        opsManagerTelegramNick: OpsManagersTelegramNicks.ROMAN_PROTSIV,
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
        opsManagerTelegramNick: OpsManagersTelegramNicks.DMITRIY_TUKAN,
        areaOnionCodes: ['BTA', 'VNT', 'CHK', 'ZHY', 'KHM', 'UMA', 'KPD'],
    },
    KIEV: {
        opsManagerTelegramNick: OpsManagersTelegramNicks.SERGEY_SEREZHENKO,
        areaOnionCodes: ['KIE', 'KYI', 'BRO', 'BOR', 'VSG', 'IRP'],
    },
}
