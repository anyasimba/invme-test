import React from 'react'
import { observer } from 'mobx-react'

import { DayState } from '../../store/Day'
import { EventState } from '../../store/Event'

import * as Styles from './Day.styles'

type Props = {
    isPrevMonth: boolean
    dayState: DayState
    handleAddEventClick: (day: Day) => void
    handleEditEventClick: (day: Day, event: EventState) => void
}

type NewEvent = {
    time: string
    title: string
}

type State = {
    isEditing: boolean
    editingEvent: EventState | null
    newEvent: NewEvent | null
}

@observer
export class Day extends React.Component<Props, State> {
    layout = React.createRef<HTMLDivElement>()
    editingEventLabel = React.createRef<HTMLDivElement>()

    constructor (props: Props) {
        super(props)

        this.state = {
            isEditing: false,
            editingEvent: null,
            newEvent: null,
        }
    }

    render () {
        const {
            layout,
            editingEventLabel,
        } = this
        
        const {
            isPrevMonth,
            dayState,   
            handleAddEventClick,
            handleEditEventClick,
        } = this.props

        const {
            events,
        } = dayState

        const {
            isEditing,
            editingEvent,
            newEvent,
        } = this.state

        return (
            <Styles.Layout
                ref={layout}
                className={`
                    ${isPrevMonth ? 'PrevMonth' : ''}
                    ${isEditing ? 'IsEditing' : ''}
                `}
            >
                <div className="Day">{dayState.day}</div>
                <div
                    className="Add"
                    onClick={() => {handleAddEventClick(this)}}
                >
                    +
                </div>

                {events.map((event, i) => (
                    <div
                        ref={editingEvent === event? editingEventLabel : null}
                        key={i}
                        className="Event"
                        onClick={() => {handleEditEventClick(this, event)}}
                    >
                        <b>{event.time}</b> {event.title}
                    </div>
                ))}
                {newEvent && (
                    <div
                        ref={!editingEvent? editingEventLabel : null}
                        className="Event"
                    >
                        <b>{newEvent.time}</b> {newEvent.title}
                    </div>
                )}
            </Styles.Layout>
        )
    }
}