import { observable, computed, observe, action } from 'mobx'

import store from './store'

import { DayState } from './Day'

export class MonthState {
    date: Date
    @observable days: {[x: string]: DayState} = {}

    constructor (date: Date) {
        this.date = date

        observe(this.days, () => {
            store?.save()
        })
    }

    getDayState (day: number) {
        const {
            date,
            days,
        } = this
        const dayStr = day.toString()

        if (days[dayStr]) {
            return days[dayStr]
        }

        const dayDate = new Date(date.getTime())
        dayDate.setDate(day)

        const dayState =
            this.days[dayStr] =
            new DayState({
                day,
                date: dayDate,
                events: [],
            })

        return dayState
    }

    @computed
    get eventsCount () {
        const {
            days
        } = this
        let count = 0
        Object.keys(days).forEach(key => {
            count += days[key].events.length
        })
        return count
    }

    @action
    removeAllEvents () {
        for (const k in this.days) {
            const dayState = this.days[k]
            dayState.events = []
        }
        store?.save()
    }
}
