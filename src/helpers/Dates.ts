import dayjs from 'dayjs'

class Dates {
    tomorrow(format: string): string {
        return dayjs().add(1, 'day').format(format)
    }
}

const dates = new Dates()
export { dates }
