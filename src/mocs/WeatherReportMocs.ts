interface IActionPlans {
    tomorrowPlan: Object
    afterTomorrowPlan: Object
}

export const mockedActionPlans: IActionPlans = {
    tomorrowPlan: {
        kyiv_plan: [
            {
                city: 'KIE',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
        ],
        mio_plan: [
            {
                city: 'KHA',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'LVI',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
        ],
        small_plan: [
            {
                city: 'IRP',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'ZHY',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
        ],
    },
    afterTomorrowPlan: {
        kyiv_plan: [
            {
                city: 'KIE',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'KYI',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
        ],
        mio_plan: [
            {
                city: 'DNP',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'ODS',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
        ],
        small_plan: [
            {
                city: 'KRR',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'ZPR',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'IVF',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
            {
                city: 'KHE',
                last_time_update: '23.12',
                phrase: Math.random() * 100 + ' %',
            },
        ],
    },
}
