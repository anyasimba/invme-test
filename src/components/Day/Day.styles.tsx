import styled from '@emotion/styled'

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin: 0 -1px -1px 0;
    width: 86px;
    height: 86px;

    border: 1px solid #F2F2F2;

    &.PrevMonth {
        opacity: 0.4;
    }

    .Day {
        position: absolute;
        font-size: 11px;
        top: 7px;
        right: 6px;
    }

    .Add {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 4px;
        right: 4px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
    }

    &:hover .Add {
        opacity: 1;
    }

    &.IsEditing .Add {
        opacity: 0;
    }

    .Event {
        position: relative;
        overflow: hidden;
        padding: 0 4px;
        top: -4px;
        height: 10px;
        width: 100%;
        font-size: 8px;
        background: #2591ED;
        color: #FFFFFF;
        white-space: nowrap;
        cursor: pointer;
    }
    .Event + .Event {
        margin: 2px 0 0;
    }
`
