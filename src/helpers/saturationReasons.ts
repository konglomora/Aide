export const lessCouriers: string = 'lessCouriersSaturatedOnions'
export const moreOrders: string = 'moreOrdersSaturatedOnions'
export const lessCouriersAndMoreOrders: string =
    'lessCouriersAndMoreOrdersSaturatedOnions'
export const hasSaturationButBetterThanD7: string =
    'hasSaturationButBetterThanD7'

export enum SaturationReasons {
    lessCouriers = 'Причина сатурации - уменьшилось количество активных курьеров в разрезе с прошлой неделей. ',
    moreOrders = 'Причина сатурации -  прирост количества заказов в разрезе с прошлой неделей.',
    lessCouriersAndMoreOrders = 'Причина сатурации - прирост заказов и уменьшилось количество активных курьеров в сравнении с прошлой неделей. ',
    hasSaturationButBetterThanD7 = 'hasSaturationButBetterThanD7',
}
