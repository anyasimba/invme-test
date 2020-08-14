import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { months, weekDays } from '../../helpers/date' 

import { EventState } from '../../store/Event'

import store from '../../store'

import { Day } from '../Day'

import * as Styles from './Calendar.styles'
import { DayState } from '../../store/Day'
import { EventEditor } from '../EventEditor'

type Props = {}

type State = {
    prevMonthDate: Date
    monthDate: Date
    isShowEventEditor: boolean
    eventEditorDay: Day | null
    eventEditorEvent: EventState | null
}

type BodyProps = {
    weekDay: number
    daysInMonth: number
    daysInPrevMonth: number
}

export class Calendar extends React.Component<Props, State> {
    eventEditor = React.createRef<EventEditor>()

    constructor (props: Props) {
        super(props)

        this.state = {
            prevMonthDate: this.prevMonthDate(),
            monthDate: this.currentMonthDate(),
            isShowEventEditor: false,
            eventEditorDay: null,
            eventEditorEvent: null,
        }
    }

    prevMonthDate () {
        const monthDate = this.currentMonthDate()
        monthDate.setMonth(monthDate.getMonth() - 1)
        return monthDate
    }

    currentMonthDate () {
        const month = new Date()
        month.setDate(1)
        month.setHours(0, 0, 0, 0)
        return month
    }

    handlePrevMonthClick = () => {
        this.setState(prevState => {
            const nextMonthDate = prevState.monthDate
            const monthDate = new Date(nextMonthDate.getTime())
            monthDate.setMonth(nextMonthDate.getMonth() - 1)
            const prevMonthDate = new Date(monthDate.getTime())
            prevMonthDate.setMonth(monthDate.getMonth() - 1)
            return {
                prevMonthDate,
                monthDate,
                isShowEventEditor: false,
                eventEditorDay: null,
            }
        })
    }

    handleNextMonthClick = () => {
        this.setState(prevState => {
            const prevMonthDate = prevState.monthDate
            const monthDate = new Date(prevMonthDate.getTime())
            monthDate.setMonth(prevMonthDate.getMonth() + 1)
            return {
                prevMonthDate,
                monthDate,
                isShowEventEditor: false,
                eventEditorDay: null,
            }
        })
    }

    handleTodayClick = () => {
        this.setState({
            prevMonthDate: this.prevMonthDate(),
            monthDate: this.currentMonthDate(),
        })
    }

    handleRemoveAllFromMonth = () => {
        const {
            monthDate,
        } = this.state

        const monthState = store.getMonthState(monthDate)
        monthState.removeAllEvents()
    }

    handleAddEventClick = (day: Day) => {
        if (this.state.isShowEventEditor) {
            return
        }

        this.setState({
            isShowEventEditor: true,
            eventEditorDay: day,
        })

        day.setState({
            isEditing: true,
            newEvent: {
                title: '',
                time: '',
            }
        })
    }

    handleEditEventClick = (day: Day, event: EventState) => {
        if (this.state.isShowEventEditor) {
            return
        }
        
        this.setState({
            isShowEventEditor: true,
            eventEditorDay: day,
            eventEditorEvent: event,
        })

        day.setState({
            isEditing: true,
            editingEvent: event,
        })
    }

    closeEventEditor = () => {
        this.setState({
            isShowEventEditor: false,
            eventEditorDay: null,
            eventEditorEvent: null,
        })
    }
    
    getDate (monthDate: Date) {
        const month = months[monthDate.getMonth()]
        const year = monthDate.getFullYear().toString()
        const weekDay = monthDate.getDay()%7

        const daysInPrevMonth = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth(),
            0
        ).getDate()

        const daysInMonth = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth() + 1,
            0
        ).getDate()

        return {
            month,
            year,
            daysInPrevMonth,
            daysInMonth,
            weekDay,
        }
    }

    getBody ({
        weekDay,
        daysInPrevMonth,
        daysInMonth,
    }: BodyProps) {
        const {
            handleAddEventClick,
            handleEditEventClick,
        } = this

        const {
            prevMonthDate,
            monthDate,
        } = this.state

        const prevMonthState = store.getMonthState(prevMonthDate)
        const monthState = store.getMonthState(monthDate)

        const days: DayState[] = []
        function isPrevMonth (i: number) {
            return i < weekDay
        }

        for (let i = 0; isPrevMonth(i); ++i) {
            const day = daysInPrevMonth - weekDay + i + 1
            days.push(prevMonthState.getDayState(day))
        }
        for (let i = 1; i <= daysInMonth; ++i) {
            days.push(monthState.getDayState(i))
        }

        return (
            <Styles.BodyContainer>
                <div>
                    {days.map((dayState, i) => (
                        <Day
                            key={dayState.date.toString()}
                            isPrevMonth={isPrevMonth(i)}
                            dayState={dayState}
                            handleAddEventClick={handleAddEventClick}
                            handleEditEventClick={handleEditEventClick}
                        />
                    ))}
                </div>
            </Styles.BodyContainer>
        )
    }

    render () {
        const {
            eventEditor,
            handlePrevMonthClick,
            handleNextMonthClick,
            handleTodayClick,
            handleRemoveAllFromMonth,
            closeEventEditor,
        } = this

        const {
            monthDate,
            eventEditorDay,
            eventEditorEvent,
            isShowEventEditor,
        } = this.state

        const {
            month,
            year,
            weekDay,
            daysInPrevMonth,
            daysInMonth,
        } = this.getDate(monthDate)
        
        const body = this.getBody({
            weekDay,
            daysInPrevMonth,
            daysInMonth,
        })

        const monthState = store.getMonthState(monthDate)
        const monthEventsCount = monthState.eventsCount

        return (
            <Styles.Layout>
                <Styles.Container>
                    <Styles.Head>
                        <Styles.HeadTitle>
                            {month} {year}
                        </Styles.HeadTitle>
                        <Styles.HeadSelection>
                            <button
                                onClick={handlePrevMonthClick}
                            >
                                <img alt="Previous" src="/images/arrow-right.svg" />
                            </button>
                            <span
                                onClick={handleTodayClick}
                            >
                                Today
                            </span>
                            <button
                                onClick={handleNextMonthClick}>
                                <img alt="Next" src="/images/arrow-right.svg" />
                            </button>
                        </Styles.HeadSelection>
                    </Styles.Head>

                    <Styles.Body>
                        <Styles.WeekDays>
                            {weekDays.map(day => (
                                <div key={day}>{day}</div>
                            ))}
                        </Styles.WeekDays>

                        <SwitchTransition>
                            <CSSTransition
                                key={monthDate.toString()}
                                addEndListener={(node, done) => {
                                    node.addEventListener("transitionend", done, false)
                                }}
                                classNames='fade'
                            >
                                {body}
                            </CSSTransition>
                        </SwitchTransition>
                    </Styles.Body>

                    <Styles.Foot>
                        <Styles.MonthEventsCount>
                            {monthEventsCount} event{`${monthEventsCount !== 1? 's' : ''}`} on {month} -
                        </Styles.MonthEventsCount>
                        <Styles.RemoveAllFromMonth
                            onClick={handleRemoveAllFromMonth}
                        >
                            Remove All
                        </Styles.RemoveAllFromMonth>
                    </Styles.Foot>
                </Styles.Container>
                {isShowEventEditor && (
                    <EventEditor
                        ref={eventEditor}
                        day={eventEditorDay!}
                        event={eventEditorEvent}
                        closeEventEditor={closeEventEditor}
                    />
                )}
            </Styles.Layout>
        )
    }
}
