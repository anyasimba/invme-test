import styled from '@emotion/styled'

export const Layout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 9px;
    width: 126px;
    background: #FFFFFF;
    box-shadow: 0px 6px 11px rgba(22, 97, 161, 0.11);
    border-radius: 10px;
    background: #FFFFFF;

    &:before {
        position: absolute;
        content: '';
        width: 6.93px;
        height: 6.93px;
        top: 16px;
        left: -3.465px;
        background: #FFFFFF;
        transform: matrix(0.71, -0.5, 1, 0.71, 0, 0);
    }

    input,
    .Date,
    textarea {
        width: 100%;
        max-width: 100%;
        font-size: 11px;
        padding: 0 6px;
        background: #F1F8FB;
        border: none;
        border-radius: 4px;

        &.error {
            border: 1px solid #FF727A;
        }
    }

    .Time {
        margin: 9px 0 0;
    }

    .Date {
        margin: 9px 0 0;
        user-select: none;
    }

    input,
    textarea {
        &:focus, &:active {
            border: none;
            outline: none;
        }
    }

    textarea {
        margin: 9px 0 0;
        resize: none;
        height: 60px;
        padding: 6px;
    }

    .Foot {
        display: flex;
        margin: 5px 0 0;
        justify-content: flex-end;
    }

    .Remove {
        font-size: 8px;
        color: #FF727A;
        cursor: pointer;
    }
`