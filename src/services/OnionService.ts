interface IOnionService {
    kyivOnionCodes: string[]
    satelliteOnionCodes: string[]
    mioCodes: string[]
    smallOnionCodes: string[]
    onionCodesWithMPModeSetting: string[]
    onionCodesWithBlockSetting: string[]
    onionHasMPModeSetting(onionCode: string): boolean
    onionIsKyiv(onionCode: string): boolean
    onionIsSatellite(onionCode: string): boolean
    onionIsMio(onionCode: string): boolean
}

class OnionService implements IOnionService {
    kyivOnionCodes: string[]
    satelliteOnionCodes: string[]
    mioCodes: string[]
    smallOnionCodes: string[]
    onionCodesWithMPModeSetting: string[]
    onionCodesWithBlockSetting: string[]
    private _scheduleTimeSlots: string[]

    constructor() {
        this.kyivOnionCodes = ['KIE', 'KYI']
        this.satelliteOnionCodes = ['BOR', 'BRO', 'IRP', 'KRU']
        this.mioCodes = ['DNP', 'KHA', 'LVI', 'ODS']
        this.smallOnionCodes = [
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
        ]
        this.onionCodesWithMPModeSetting = ['KIE', 'KYI', 'LVI']
        this._scheduleTimeSlots = [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
        ]
        this.onionCodesWithBlockSetting = [
            ...this.mioCodes,
            ...this.smallOnionCodes,
        ]
    }

    onionIsKyiv(onionCode: string) {
        return this.kyivOnionCodes.includes(onionCode)
    }

    onionIsSatellite(onionCode: string) {
        return this.satelliteOnionCodes.includes(onionCode)
    }

    onionIsMio(onionCode: string) {
        return this.mioCodes.includes(onionCode)
    }

    onionIsSmall(onionCode: string) {
        return this.smallOnionCodes.includes(onionCode)
    }

    onionHasMPModeSetting(onionCode: string) {
        return this.onionCodesWithMPModeSetting.includes(onionCode)
    }

    onionHasBlockSetting(onionCode: string) {
        return this.onionCodesWithBlockSetting.includes(onionCode)
    }

    get scheduleTimeSlots(): string[] {
        return this._scheduleTimeSlots
    }
}

export const onionService = new OnionService()
