import React from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'

function Loading() {
    const theme = useThemeContext()
    return (
        <LoadingStyled theme={theme}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </LoadingStyled>
    )
}

const LoadingStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 72px;
        height: 72px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 58px;
        height: 58px;
        margin: 7px;
        border: 3px solid ${props => props.theme.colorPrimary};
        border-radius: 50%;
        animation: lds-ring 1.15s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${props => props.theme.colorPrimary} transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Loading