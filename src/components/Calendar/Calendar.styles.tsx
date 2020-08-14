import styled from '@emotion/styled'

export const Layout = styled.div`
    position: relative;
    overflow-x: auto;
`
export const Container = styled.div`
    width: 635px;
    margin: 0 auto;
    padding: 20px;
    user-select: none;
`

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const HeadTitle = styled.div`
    font-weight: 800;
    font-size: 20px;
    color: #000000;
    text-transform: uppercase;
`

export const HeadSelection = styled.div`
    display: flex;
    align-items: center;
    > button {
        border: none;
        background: none;
        outline: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        &:first-of-type {
            > img {
                transform: scaleX(-1);
            }
        }
    }
    > span {
        position: relative;
        top: 1px;
        margin: 0 14px;
        font-family: 'Roboto';
        font-size: 11px;
        color: #000000;
        cursor: pointer;
    }
`

export const Body = styled.div`
    width: 635px;
    overflow: hidden;
`

export const BodyContainer = styled.div`
    > div {
        display: flex;
        flex-wrap: wrap;
    }
`

export const WeekDays = styled.div`
    display: flex;
    margin: 30px 0 6px;
    > div {
        width: 85px;
        font-size: 11px;
        text-align: right;
    }
`

export const Foot = styled.div`
    display: flex;
    margin: 17px 0 0;
`

export const MonthEventsCount = styled.div`
    font-size: 12px;
    color: #B0AFAF;
`

export const RemoveAllFromMonth = styled.div`
    margin: 0 0 0 3px;
    font-size: 12px;
    color: #2591ED;
    cursor: pointer;
`
