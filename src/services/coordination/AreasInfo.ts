import { OpsManagersTelegramNick } from './TelegramData'

export enum GsTelegramNick {
    kupriianova = '@AnnaKupriianova',
    valeria = '@Valery_A27',
    kurash = '@Viktoria',
    tereshchuk = '@tereshchukjul',
    rengach = '@ed_rengach',
    ekaterina = '@K2111M',
    denys = '@ne_denys',
    hordiy = '@Hordiyy',
    hrihorash = '@Oles_Hr',
}

export interface IGsPerOnion {
    onionCodes: string[]
    gSTelegramNick: GsTelegramNick | OpsManagersTelegramNick
}

export interface IAreas {
    [key: string]: {
        opsManagerTelegramNick: string
        areaOnionCodes: string[]
        gsPerOnions?: IGsPerOnion[]
    }
}

export const areas: IAreas = {
    A1: {
        opsManagerTelegramNick: OpsManagersTelegramNick.OLHA_FIONOVA,
        areaOnionCodes: ['KHA', 'CHE', 'POL', 'SUM', 'KRM', 'SLV'],
        gsPerOnions: [
            {
                onionCodes: ['KHA'],
                gSTelegramNick: GsTelegramNick.kurash,
            },
            {
                onionCodes: ['CHE'],
                gSTelegramNick: GsTelegramNick.tereshchuk,
            },
            {
                onionCodes: ['POL', 'SUM'],
                gSTelegramNick: GsTelegramNick.kupriianova,
            },
            {
                onionCodes: ['KRM', 'SLV'],
                gSTelegramNick: OpsManagersTelegramNick.OLHA_FIONOVA,
            },
        ],
    },

    A2: {
        opsManagerTelegramNick: OpsManagersTelegramNick.OLHA_FIONOVA,
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
        gsPerOnions: [
            {
                onionCodes: ['DNP'],
                gSTelegramNick: GsTelegramNick.valeria,
            },

            {
                onionCodes: ['KRO', 'KRR', 'ZPR', 'KRK', 'MPL', 'BDK', 'KAM'],
                gSTelegramNick: GsTelegramNick.rengach,
            },
        ],
    },
    A3: {
        opsManagerTelegramNick: OpsManagersTelegramNick.DMITRIY_TUKAN,
        areaOnionCodes: ['ODS', 'ODE', 'MKL', 'KHE', 'CHS'],
        gsPerOnions: [
            {
                onionCodes: ['ODS', 'ODE', 'MKL', 'KHE', 'CHS'],
                gSTelegramNick: GsTelegramNick.ekaterina,
            },
        ],
    },
    A4: {
        opsManagerTelegramNick: OpsManagersTelegramNick.ROMAN_PROTSIV,
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
        gsPerOnions: [
            {
                onionCodes: ['IVF', 'CHN', 'RVN', 'TNP'],
                gSTelegramNick: GsTelegramNick.denys,
            },

            {
                onionCodes: ['LVI', 'LUT', 'UZH', 'TRK', 'DRH'],
                gSTelegramNick: GsTelegramNick.hordiy,
            },
        ],
    },
    A5: {
        opsManagerTelegramNick: OpsManagersTelegramNick.DMITRIY_TUKAN,
        areaOnionCodes: ['BTA', 'VNT', 'CHK', 'ZHY', 'KHM', 'UMA', 'KPD'],
        gsPerOnions: [
            {
                onionCodes: ['BTA', 'VNT', 'CHK', 'ZHY', 'KHM', 'UMA', 'KPD'],
                gSTelegramNick: GsTelegramNick.hrihorash,
            },
        ],
    },

    KIEV: {
        opsManagerTelegramNick: OpsManagersTelegramNick.SERGEY_SEREZHENKO,
        areaOnionCodes: ['KIE', 'KYI', 'BRO', 'BOR', 'VSG', 'IRP'],
        gsPerOnions: [
            {
                onionCodes: ['KIE', 'KYI', 'BRO', 'BOR', 'VSG', 'IRP'],
                gSTelegramNick: OpsManagersTelegramNick.SERGEY_SEREZHENKO,
            },
        ],
    },
}
