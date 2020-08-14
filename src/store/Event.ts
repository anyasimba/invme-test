import { observable, reaction } from 'mobx'

import store from './store'

export class EventState {
    @observable
    title!: string

    @observable
    time!: string
    
    @observable
    comment!: string

    constructor (props: EventState) {
        Object.assign(this, props)

        reaction(() => observable({...this}), () => {
            console.log('save')
            store?.save()
        })
    }
}