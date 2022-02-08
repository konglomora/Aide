export interface IOnionCodesForBonus {
    kyiv: string[]
    satellites: string[]
    mio: string[]
}

interface IResourceIncreaseByCapacity {
    full: number
    partial: number
    empty: number
}

export interface IIncreaseData {
    bonusSizeIncrease: number
    capacitySizeIncrease: number
    bonusReason: TBonusReason
}

interface IResourcesByCapacity {
    [key: string]: {
        bonusIncrease: IResourceIncreaseByCapacity
        capacityIncrease: IResourceIncreaseByCapacity
        bonusReason: {
            full: BonusReasons
            partial: BonusReasons
            empty: BonusReasons
        }
    }
}
