import { observable, observe } from 'mobx'

import { MonthState } from './Month'
import { DayState } from './Day'
import { EventState } from './Event'

class Store {
    @observable
    months: {[x: string]: MonthState} = {}

    constructor () {
        this.load()

        observe(this.months, () => {
            this.save()
        })
    }

    load () {
        const json = localStorage.getItem('calendar')
        if (json) {
            const months = JSON.parse(json)
            for (const k in months) {
                this.loadMonth(k, months[k])
            }
        }
    }
    
    loadMonth (k: string, month: MonthState) {
        const monthState = this.months[k] = new MonthState(new Date(month.date))
        for (const k in month.days) {
            this.loadDay(monthState, k, month.days[k])
        }
    }

    loadDay (monthState: MonthState, k: string, day: DayState) {
        const dayState = monthState.days[k] = new DayState({
            day: day.day,
            date: new Date(day.date),
            events: [],
        })

        for (const i in day.events) {
            this.loadEvent(dayState, day.events[i])
        }
    }

    loadEvent (dayState: DayState, event: EventState) {
        dayState.events.push(new EventState(event))
    }

    save () {
        localStorage.setItem('calendar', JSON.stringify(this.months))
    }

    getMonthState (date: Date) {
        const { months } = this
        const dateStr = date.toString()
        if (months[dateStr]) {
            return months[dateStr]
        }

        const monthState =
            this.months[dateStr] =
            new MonthState(date)

        return monthState
    }
}
export default new Store()
