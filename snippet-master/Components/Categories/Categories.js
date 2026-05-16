import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
import { useSnippetContext } from '../../context/snippetContext';
import categories from '../../utils/categories';
import { getUnique } from '../../utils/helper';
import Button from '../Button/Button';

function Categories() {
    const theme  = useThemeContext()
    const { collapsed } = useUserContext()
    const [activeCategory, setActiveCategory] = useState(0);
    const [tagName, setTagName] = useState('')
    const { snippets } = useSnippetContext();

    //get unique categories
    const categs = getUnique(categories, 'categories');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    }

    //filter snippets by the category
    useEffect(() => {
        //filter snippets by tag name
        
    }, [activeCategory])

    //get category name on click
    useEffect(() => {
        setTagName(categs[activeCategory])
    }, [activeCategory])

    console.log('tagName', tagName);

    console.log()
    return (
        <CategoriesStyled theme={theme} expandedNav={collapsed}>
            {
                categs.map((cat, index) => {
                    return <Button 
                        key={index} 
                        name={cat} 
                        selector={`category ${activeCategory === index ? 'active': null}`}
                        padding={'.4rem 1rem'} 
                        blob={'blob'}
                        border={`1px solid ${theme.colorIcons}`}
                        click={() => handleCategoryClick(index)}
                    />
                })
            }
        </CategoriesStyled>
    )
}

const CategoriesStyled = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 0.65rem;
    overflow-x: auto;
    padding: 0.85rem clamp(1rem, 4vw, 1.5rem);
    padding-bottom: 1rem;
    margin-top: 0;
    border-bottom: 2px dashed ${props => props.theme.borderColor2};
    position: fixed;
    top: 4.25rem;
    left: ${props => props.expandedNav ? props.theme.sidebarWidth : props.theme.sidebarCollapsed};
    right: 0;
    z-index: 2;
    background: ${props => props.theme.colorBg3};
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    .category{
        flex-shrink: 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.68rem !important;
        background-color: ${props => props.theme.colorButton};
        border-radius: ${props => props.theme.borderRadiusSm};
        color: ${props => props.theme.colorTextSecondary};
        font-weight: 700;
        border: 2px solid ${props => props.theme.colorIcons3};
        &:not(:last-child){
            margin-right: 0;
        }
    }
    .active{
        background: ${props => props.theme.colorGreyDark};
        color: ${props => props.theme.colorWhite} !important;
        border-color: ${props => props.theme.colorBrutal || props.theme.colorPrimary};
        box-shadow: 4px 4px 0 ${props => props.theme.colorBrutalAccent || props.theme.colorPrimary2};
    }
`;

export default Categories