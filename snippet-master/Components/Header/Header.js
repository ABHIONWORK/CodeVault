import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useThemeContext, useThemeUpdate } from '../../context/themeContext';
import logo from '../../assets/logo.svg'
import Image from 'next/image'
import { add, bars, bell, join, login, moon } from '../../utils/Icons';
import Button from '../Button/Button';
import SearchForm from '../SearchForm/SearchForm';
import {gsap} from 'gsap'
import { useUserContext } from '../../context/context';
import avatar1 from '../../assets/avatar1.png'
import { isAuth, signout } from '../../actions/auth';
import Router from 'next/router';

function Header() {
    const theme = useThemeContext()
    //refs
    const header = useRef()

    //context
    const { collapseNavbar, showMenuPanel, hideTopPanel, showModal } = useUserContext()
    const setTheme = useThemeUpdate()

    /*useEffect(() => {
        const tl = gsap.timeline()
        tl.fromTo(header.current, { opacity: 0, scale: 0, y:'-100%' }, { opacity: 1, scale: 1, y:'0%' , duration: 1, ease: 'power3.inOut'})
        //stop rerendering
        return () => {
            tl.kill()
        }
    }, [])*/
    return (
        <HeaderStyled theme={theme} ref={header} suppressHydrationWarning={true}>
            <div className="logo-con">
                <div className="h-menu">
                    <button type='button' onClick={()=>{
                        collapseNavbar()
                        hideTopPanel()
                    }}>
                        {bars}
                    </button>
                </div>
                <div className="logo">
                    <Image src={logo} width={40} height={40} alt="" className="logo-mark" />
                    <div className="brand-type">
                        <h4>snp·try</h4>
                        <span className="brand-tag">build · stash · run</span>
                    </div>
                </div>
            </div>
            <div className="user-content">
                <div className="form-con">
                    <SearchForm />
                </div>
                <button className="h-btn theme" onClick={() => {
                    //toggle theme
                    // setTheme(
                    //     theme.name === 'light' ? 0 : 1
                    // )
                }}>
                    {moon}
                </button>
                <button className="h-btn notifications">
                    {bell}
                </button>
                <div className="nav-btns">
                    {
                        isAuth() ? 
                            <Button
                                selector={'create-snippet h-btn'}
                                name={'Create Snippet'}
                                icon={add}
                                backgound={theme.colorPrimary}
                                padding={'.5rem 1rem'}
                                borderRad={theme.borderRadiusSm}
                                fw={500}
                                fs={'18px'}
                                click={() =>{
                                    hideTopPanel()
                                    showModal()
                                }}
                            /> :
                            <Button
                                name={'Login'}
                                type={'submit'}
                                selector={'btn-login'}
                                padding={'.8rem 2rem'}
                                borderRad={'0.8rem'}
                                fw={'bold'}
                                fs={'1.2rem'}
                                backgound={theme.colorIcons3}
                                icon={login}
                                blob={'blob'}
                                click={() => Router.push('/login')}
                            />
                    }
                    {
                        !isAuth() && 
                        <Button
                            name={'Register'}
                            type={'submit'}
                            selector={'btn-login'}
                            padding={'.8rem 2rem'}
                            borderRad={'0.8rem'}
                            fw={'bold'}
                            fs={'1.2rem'}
                            backgound={theme.colorPrimary2}
                            icon={join}
                            blob={'blob'}
                            click={() => Router.push('/register')}
                        />
                    }
                </div>
                <div className="user-info">
                    {
                        isAuth() && 
                        <button type='button' onClick={showMenuPanel}>
                            <Image src={avatar1} width={40} height={40} style={{ borderRadius: '50%' }} />
                        </button>
                    }
                </div>
            </div>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    height: 4.25rem;
    min-height: 4.25rem;
    width: 100%;
    background: ${props => props.theme.colorBg};
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 2px solid ${props => props.theme.borderColor};
    box-shadow: none;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background: ${props => props.theme.colorGradient};
        opacity: 0.85;
        pointer-events: none;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${props => props.theme.padLRSm};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    .btn-login{
        i{
            color: ${props => props.theme.colorGrey0};
        }
    }
    .nav-btns{
        display: flex;
        align-items: center;
        button{
            &:first-child{
                margin-left:1rem;
            }
            &:last-child{
                margin-left:1rem;
            }
        }
    }
    i{
        color: ${props => props.theme.colorIcons};
        font-size: 1.5rem;
    }
    .create-snippet{
        i{
            color: ${props => props.theme.colorWhite};
            font-size: 1.9rem;
        }
        &:hover{
            color: ${props => props.theme.colorWhite};
        }
    }
    button{
        cursor: pointer;
        &:hover{
            i{
                color: ${props => props.theme.colorIcons2};
                transition: all .4s ease-in-out;
            }
        }
    }
    .logo-con{
        display: flex;
        align-items: center;
        .h-menu{
            button{
                outline: none;
                border: none;
                background: transparent;
                cursor: pointer;
                margin-right: 1rem;
                i{
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .logo{
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }
        .logo-mark {
            border: 2px solid ${props => props.theme.borderColor};
            border-radius: ${props => props.theme.borderRadiusSm};
            padding: 2px;
            background: ${props => props.theme.colorBg3};
        }
        .brand-type {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;
            line-height: 1.1;
        }
        .brand-tag {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.62rem;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: ${props => props.theme.colorTextSecondary};
            opacity: 0.95;
        }
        h4{
            font-size: ${props => props.theme.fH4};
            margin: 0;
            font-weight: 800;
            letter-spacing: -0.04em;
            color: ${props => props.theme.colorTextLight};
        }
    }

    .user-content{
        display: flex;
        align-items: center;
        .h-btn{
            margin: ${props => props.theme.marLRSm};
        }
        .form-con{
            margin-right: 1rem;
        }
        .user-info{
            button{
                display: flex;
                align-items: center;
            }
        }
    }
`;

export default Header