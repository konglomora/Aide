import { areas } from './AreasInfo'
import { BonusReasons } from 'store/helpers/Bonus'
import { IOnionScheduleSlotsResponse } from 'store/slices/onions/slots/types'
import {
    IOnionWeatherAnalysis,
    IOnionWeatherAnalysisResponse,
} from 'store/slices/weather/types'
import onionService from '../OnionService'
import {
    IIncreaseData,
    IOnionCodesForBonus,
    IResourcesByCapacity,
} from './types'

export enum CityTypes {
    kyiv = 'KYIV',
    satellite = 'SATELLITE',
    mio = 'MIO',
    small = 'SMALL',
}

export enum CoverageLevel {
    empty = 'empty',
    partial = 'partial',
    full = 'full',
}

export class CoordinationService {
    resourcesByCapacity: IResourcesByCapacity = {
        KYIV: {
            bonusIncrease: {
                full: 20,
                partial: 20,
                empty: 30,
            },
            capacityIncrease: {
                full: 10,
                partial: 5,
                empty: 0,
            },
            bonusReason: {
                full: BonusReasons.rush,
                partial: BonusReasons.rush,
                empty: BonusReasons.bad_weather,
            },
        },
        SATELLITE: {
            bonusIncrease: {
                full: 20,
                partial: 20,
                empty: 30,
            },
            capacityIncrease: {
                full: 15,
                partial: 10,
                empty: 0,
            },
            bonusReason: {
                full: BonusReasons.rush,
                partial: BonusReasons.rush,
                empty: BonusReasons.bad_weather,
            },
        },
        MIO: {
            bonusIncrease: {
                full: 20,
                partial: 20,
                empty: 40,
            },
            capacityIncrease: {
                full: 15,
                partial: 10,
                empty: 0,
            },
            bonusReason: {
                full: BonusReasons.rush,
                partial: BonusReasons.rush,
                empty: BonusReasons.bad_weather,
            },
        },
        SMALL: {
            bonusIncrease: {
                full: 20,
                partial: 20,
                empty: 40,
            },
            capacityIncrease: {
                full: 15,
                partial: 10,
                empty: 0,
            },
            bonusReason: {
                full: BonusReasons.rush,
                partial: BonusReasons.rush,
                empty: BonusReasons.bad_weather,
            },
        },
    }

    citesByType: IOnionCodesForBonus = {
        kyiv: ['KIE', 'KYI'],
        satellites: ['BRO', 'BOR', 'IRP', 'KRU'],
        mio: ['DNP', 'KHA', 'LVI', 'ODS'],
    }

    getCityType(city: string): string {
        if (this.citesByType.kyiv.includes(city)) return CityTypes.kyiv
        if (this.citesByType.satellites.includes(city))
            return CityTypes.satellite
        if (this.citesByType.mio.includes(city)) return CityTypes.mio
        return CityTypes.small
    }

    getCoverageLevel(coverage: number): CoverageLevel {
        if (coverage === 0) return CoverageLevel.empty
        if (coverage > 70) return CoverageLevel.full
        return CoverageLevel.partial
    }

    getIncreaseData(coverage: number, type: string): IIncreaseData {
        const coverageLevel = this.getCoverageLevel(coverage)
        const bonusIncrease =
            this.resourcesByCapacity[type].bonusIncrease[coverageLevel]
        const capacityIncrease =
            this.resourcesByCapacity[type].capacityIncrease[coverageLevel]

        const bonusReason =
            this.resourcesByCapacity[type].bonusReason[coverageLevel]

        const increaseData = {
            bonusSizeIncrease: bonusIncrease,
            capacitySizeIncrease: capacityIncrease,
            bonusReason: bonusReason,
        }

        return increaseData
    }

    getResponsibleStaffTelegramNick(city: string): string {
        const areaCodes = Object.keys(areas)
        let nick = ''

        areaCodes.forEach((code) => {
            areas[code].gsPerOnions?.forEach((gs) => {
                if (gs.onionCodes.includes(city)) {
                    console.log(
                        `City ${city} at area ${code} and gs is ${gs.gSTelegramNick}`
                    )
                    nick = gs.gSTelegramNick
                }
            })
        })

        return nick
    }

    getOnionCoordination(
        analysis: IOnionWeatherAnalysisResponse,
        schedule: IOnionScheduleSlotsResponse[]
    ): IOnionWeatherAnalysis {
        const { city, percent_capacity_slots, slots } = analysis

        const type = this.getCityType(city)
        const { wetWorkingSlots, wetSchedulePeriod } =
            onionService.getWetPeriod(slots, schedule)
        const increaseData = this.getIncreaseData(percent_capacity_slots, type)
        const responsibleStaffTGNick =
            this.getResponsibleStaffTelegramNick(city)

        const coordination: IOnionWeatherAnalysis = {
            ...analysis,
            ...wetWorkingSlots,
            ...increaseData,
            saturationBotMode: 'NORMAL',
            mode: 'Normal',
            challenges: '-',
            responsibleStaffTGNick: responsibleStaffTGNick,
            wetSchedulePeriod: wetSchedulePeriod,
        }

        return coordination
    }
}

const coordinationService = new CoordinationService()

export default coordinationService
