import { ISaturatedOnionBySlot } from '../store/helpers/reports/types'

export enum ExpansionResult {
    Gradually = 'Заранее расширяли слоты - постепенно заполнялись.',
    Weakly = 'Заранее расширяли слоты - слабо заполнялись.',
}

interface ISaturationService {
    getExpansionResult(difference: string): string
    getUniqueOnionCodes(saturatedOnions: ISaturatedOnionBySlot[]): string[]
}

class SaturationService implements ISaturationService {
    getExpansionResult(difference: string) {
        if (difference.charAt(19) === '+') {
            return ExpansionResult.Gradually
        } else if (difference.charAt(19) === '-') {
            return ExpansionResult.Weakly
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
}

export const saturationService = new SaturationService()
