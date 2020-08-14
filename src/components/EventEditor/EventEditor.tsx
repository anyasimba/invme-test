import React from 'react'

import { EventState } from '../../store/Event'

import { Day } from '../Day'

import * as Styles from './EventEditor.styles'

type Props = {
    day: Day
    event: EventState | null
    closeEventEditor: () => void
}

type State = {
    title: string
    isTitleError: boolean
    time: string
    isTimeError: boolean
    comment: string
}

export class EventEditor extends React.Component<Props, State> {
    layout = React.createRef<HTMLDivElement>()

    constructor (props: Props) {
        super(props)

        this.state = {
            title: '',
            isTitleError: false,
            time: '',
            isTimeError: false,
            comment: '',
        }
    }

    componentDidMount () {
        window.addEventListener('mousedown', this.handleGlobalClick)

        this.updatePosition()
        window.addEventListener('resize', this.updatePosition)

        const {
            event,
        } = this.props

        if (event) {
            this.setState({
                title: event.title,
                time: event.time,
                comment: event.comment,
            })
        }
    }

    componentWillUnmount () {
        window.removeEventListener('mousedown', this.handleGlobalClick)

        window.removeEventListener('resize', this.updatePosition)
    }

    handleGlobalClick = (e: MouseEvent) => {
        const layout = this.layout.current!
        if (!layout.contains(e.target as Node)) {
            this.tryCloseEditor()
        }
    }

    tryCloseEditor () {
        const {
            day,
            event,
            closeEventEditor,
        } = this.props

        const {
            title,
            time,
            comment,
        } = this.state
        
        if (title === '') {
            this.setState({isTitleError: true})
            return
        }
        if (time === '') {
            this.setState({isTimeError: true})
            return
        }

        if (!event) {
            day.props.dayState.events.push(new EventState({
                title,
                time,
                comment,
            }))
        }

        day.setState({
            isEditing: false,
            newEvent: null,
            editingEvent: null,
        })

        closeEventEditor()
    }

    componentDidUpdate () {
        this.updatePosition()
    }

    updatePosition = () => {
        const layout = this.layout.current!
        
        const {
            day,
        } = this.props

        const dayLayout = day.layout.current!
        const label = day.editingEventLabel.current!

        const left = dayLayout.offsetLeft + 79
        const top = dayLayout.offsetTop + label.offsetTop - 13
        layout.style.transform = `translate(${left}px, ${top}px)`
    }

    getDate () {
        const {
            dayState
        } = this.props.day.props

        const date = dayState.date
        const dateTimeFormat = new Intl.DateTimeFormat('ru', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
        const [{ value: day },, { value: month },, { value: year }] = dateTimeFormat.formatToParts(date) 

        return `${day}.${month}.${year}`
    }

    handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value

        this.setState((prevState: State) => {
            const {
                event,
                day,
            } = this.props

            if (event) {
                event.title = title
            } else {
                day.setState({
                    newEvent: {
                        title,
                        time: prevState.time,
                    }
                })
            }

            return {
                title
            }
        })
    }

    handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value

        this.setState((prevState: State) => {
            const {
                event,
                day,
            } = this.props

            if (event) {
                event.time = time
            } else {
                day.setState({
                    newEvent: {
                        title: prevState.title,
                        time,
                    }
                })
            }

            return {
                time
            }
        })
    }

    handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const comment = e.target.value
        this.setState({comment})

        const {
            event,
        } = this.props

        if (event) {
            event.comment = comment
        }
    }

    handleRemoveClick = () => {
        const {
            day,
            event,
            closeEventEditor,
        } = this.props

        if (event) {
            const { events } = day.props.dayState
            events.splice(events.indexOf(event), 1)
        }

        day.setState({
            isEditing: false,
            editingEvent: null,
            newEvent: null,
        })

        closeEventEditor()
    }

    render () {
        const {
            layout,
            handleTitleChange,
            handleTimeChange,
            handleCommentChange,
            handleRemoveClick,
        } = this

        const {
            title,
            isTitleError,
            time,
            isTimeError,
            comment,
        } = this.state

        return (
            <Styles.Layout ref={layout}>
                <input
                    className={`
                        ${isTitleError? 'error' : ''}
                    `}
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e)}
                />
                <div
                    className="Date"
                >
                    {this.getDate()}
                </div>
                <input
                    className={`
                        Time
                        ${isTimeError? 'error' : ''}
                    `}
                    name="time"
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(e)}
                />
                <textarea
                    name="comment"
                    value={comment}
                    onChange={(e) => handleCommentChange(e)}
                />
                <div className="Foot">
                    <div className="Remove"
                        onClick={handleRemoveClick}
                    >
                        удалить
                    </div>
                </div>
            </Styles.Layout>
        )
    }
}