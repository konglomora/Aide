import {
    ISaturatedOnionAnalysis,
    ISaturatedOnionBySlot,
} from 'store/slices/saturation/types'

export enum ExpansionResult {
    gradual = 'gradual',
    weak = 'weak',
}

export enum IndicatorsDiff {
    same = 'about the same',
}

interface ISaturationService {
    getExpansionResult(glovers: number): string
    getUniqueOnionCodes(saturatedOnions: ISaturatedOnionBySlot[]): string[]
    isReportEmpty(report: ISaturatedOnionAnalysis[]): boolean
    getIndicatorsDiff(orders: number, glovers: number): string
}

class SaturationService implements ISaturationService {
    getExpansionResult(glovers: number) {
        if (glovers >= 0) {
            return ExpansionResult.gradual
        } else if (glovers <= 0) {
            return ExpansionResult.weak
        }
        return ''
    }

    getUniqueOnionCodes(saturatedOnions: ISaturatedOnionBySlot[]): string[] {
        const uniqueOnionCodes = saturatedOnions
            .reduce(
                (accum: string[], onion: ISaturatedOnionBySlot): string[] => {
                    if (!accum.some((city) => city === onion.city)) {
                        accum.push(onion.city)
                    }
                    return accum
                },
                []
            )
            .sort()
        return uniqueOnionCodes
    }

    isReportEmpty(report: ISaturatedOnionAnalysis[]): boolean {
        return report.length === 0
    }

    getIndicatorsDiff(orders: number, glovers: number): string {
        let ordersDiff = orders > 0 ? `+${orders}%` : `${orders}%`
        let gloversDiff = glovers > 0 ? `+${glovers}%` : `${glovers}%`

        if (orders === 0) ordersDiff = IndicatorsDiff.same
        if (glovers === 0) gloversDiff = IndicatorsDiff.same

        const diff = `D0 vs D7: glovers ${gloversDiff}, orders ${ordersDiff}.`

        return diff
    }
}

const saturationService = new SaturationService()
export default saturationService
