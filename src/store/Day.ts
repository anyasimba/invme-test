import { observable, observe } from 'mobx'

import store from './store'

import { EventState } from './Event'

export class DayState {
    day!: number
    date!: Date

    @observable
    events!: EventState[]

    constructor (props: DayState) {
        Object.assign(this, props)
        
        observe(this.events, () => {
            store?.save()
        })
    }
}
