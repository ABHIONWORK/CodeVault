import React from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
function MainContent({children}) {
    const theme = useThemeContext()
    const {collapsed, hideTopPanel} = useUserContext()
    return (
        <MainContentStyled theme={theme} collapsed={collapsed} onClick={hideTopPanel}>
            {children}
        </MainContentStyled>
    )
}

const MainContentStyled = styled.main`
    flex: 1;
    margin-left: ${props => props.collapsed ? props.theme.sidebarWidth  : props.theme.sidebarCollapsed};
    background: transparent;
    min-height: 100vh;
    margin-top: 4.25rem;
    position: relative;
`;

export default MainContent