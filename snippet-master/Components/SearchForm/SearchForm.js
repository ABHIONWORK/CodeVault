import React, { useState } from 'react'
import styled from 'styled-components'
import { searchSnippets } from '../../actions/snippet';
import { useSnippetContext } from '../../context/snippetContext';
import { useThemeContext } from '../../context/themeContext';
import { search as searchIcon } from '../../utils/Icons';

function SearchForm() {
    const theme = useThemeContext()

    const { handleSearch, handleInputChange, hideTopPanel } = useSnippetContext()

    //searched snippets


    //handle search input
    

    return (
        <SearchFormStyled theme={theme} onSubmit={handleSearch} >
            <div className="input-control">
                <input type="text" placeholder='Search snippets…' onChange={handleInputChange} />
                <button className="search">
                    {searchIcon}
                </button>
            </div>
        </SearchFormStyled>
    )
}

const SearchFormStyled = styled.form`
    .input-control{
        position: relative;
        input{
            background: ${props => props.theme.colorBg2};
            padding: .65rem 2.75rem .65rem 1rem;
            border-radius: ${props => props.theme.borderRadiusSm};
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.875rem;
            width: min(100%, 380px);
            max-width: 42vw;
            color: ${props => props.theme.colorTextLight};
            border: 1px solid ${props => props.theme.borderColor};
            transition: border-color .2s ease, box-shadow .2s ease, width .2s ease;
            &:focus{
                width: min(100%, 460px);
                border-color: ${props => props.theme.colorBrutal || props.theme.colorPrimary};
                box-shadow: 4px 4px 0 ${props => props.theme.colorBrutalAccent || props.theme.colorPrimary2};
            }
            &::placeholder{
                font-weight: 500;
                color: ${props => props.theme.colorIcons};
            }
        }
        .search{
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.75;
        }
    }
    @media screen and (max-width: 900px){
        .input-control input{
            max-width: 100%;
            width: 100%;
            &:focus{
                width: 100%;
            }
        }
    }
`;

export default SearchForm