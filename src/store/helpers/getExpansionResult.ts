export enum ExpansionResult {
    Gradually = 'Заранее расширяли слоты - постепенно заполнялись.',
    Weakly = 'Заранее расширяли слоты - слабо заполнялись.',
}

export const getExpansionResult = (difference: string): string => {
    if (difference.charAt(19) === '+') {
        return ExpansionResult.Gradually
    } else if (difference.charAt(19) === '-') {
        return ExpansionResult.Weakly
    }
    return ''
}
