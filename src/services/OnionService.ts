interface IOnionService {
    onionHasMPModeSetting(onionCode: string): boolean
    onionIsKyiv(onionCode: string): boolean
    onionIsSatellite(onionCode: string): boolean
    onionIsMio(onionCode: string): boolean
}

class OnionService implements IOnionService {
    private _kyivOnionCodes: string[]
    private _satelliteOnionCodes: string[]
    private _mioCodes: string[]
    private _smallOnionCodes: string[]
    private _onionCodesWithMPModeSetting: string[]
    private _onionCodesWithBlockSetting: string[]
    private _scheduleTimeSlots: string[]

    constructor() {
        this._kyivOnionCodes = ['KIE', 'KYI']
        this._satelliteOnionCodes = ['BOR', 'BRO', 'IRP', 'KRU']
        this._mioCodes = ['DNP', 'KHA', 'LVI', 'ODS']
        this._smallOnionCodes = [
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
        this._onionCodesWithMPModeSetting = ['KIE', 'KYI', 'LVI']
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
        this._onionCodesWithBlockSetting = [
            ...this._mioCodes,
            ...this._smallOnionCodes,
        ]
    }

    onionIsKyiv(onionCode: string) {
        return this._kyivOnionCodes.includes(onionCode)
    }

    onionIsSatellite(onionCode: string) {
        return this._satelliteOnionCodes.includes(onionCode)
    }

    onionIsMio(onionCode: string) {
        return this._mioCodes.includes(onionCode)
    }

    onionIsSmall(onionCode: string) {
        return this._smallOnionCodes.includes(onionCode)
    }

    onionHasMPModeSetting(onionCode: string) {
        return this._onionCodesWithMPModeSetting.includes(onionCode)
    }

    onionHasBlockSetting(onionCode: string) {
        return this._onionCodesWithBlockSetting.includes(onionCode)
    }

    get scheduleTimeSlots(): string[] {
        return this._scheduleTimeSlots
    }

    getWetWorkingSlots(prepSlots: string, onionSchedule: string[]) {}
}

const onionService = new OnionService()

export default onionService
