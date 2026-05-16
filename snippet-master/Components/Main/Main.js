import React from 'react'
import styled from 'styled-components'
import MainContent from '../MainContent/MainContent';

function Main() {
    return (
        <MainStyled >
            <MainContent />
        </MainStyled>
    )
}

const MainStyled = styled.main`
    padding-top: 4.25rem;
`;

export default Main