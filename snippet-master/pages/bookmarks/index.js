import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCookie, isAuth } from '../../actions/auth'
import { fetchSidebarData } from '../../actions/snippet'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import Snippet from '../../Components/Snippet/Snippet'
import { useThemeContext } from '../../context/themeContext'
import Loading from '../../Components/Loading/Loading'
import Link from 'next/link'

function Bookmarks() {
    const theme = useThemeContext()
    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)
    const authenticated = isAuth()

    useEffect(() => {
        if (authenticated) {
            const token = getCookie('token')
            fetchSidebarData('bookmarks', token).then(data => {
                if (data && !data.error) {
                    setSnippets(data)
                }
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [authenticated])

    return (
        <Layout>
            <MainContent>
                <div className="main-title">
                    <h1>Bookmarks</h1>
                </div>

                {!authenticated ? (
                    <div className="empty-state">
                        <h3>Please <Link href="/login">log in</Link> to view your bookmarks</h3>
                    </div>
                ) : (
                    <>
                        <div className="loading-con">
                            {loading && <Loading />}
                        </div>
                        {!loading && (
                            <BookmarksStyled theme={theme}>
                                <div className={snippets.length === 0 ? "empty-container" : "snippets-con"}>
                                    {snippets.length === 0 ? (
                                        <div className="empty-state">
                                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <h3>No bookmarks yet</h3>
                                            <p>Save your favorite snippets to easily find them later!</p>
                                            <button className="btn-create" onClick={() => window.location.href='/popular'}>Explore popular snippets</button>
                                        </div>
                                    ) : (
                                        snippets.map(snippet => (
                                            <Snippet key={snippet.id} snippet={snippet} />
                                        ))
                                    )}
                                </div>
                            </BookmarksStyled>
                        )}
                    </>
                )}
            </MainContent>
        </Layout>
    )
}

const BookmarksStyled = styled.div`
    .empty-container {
        padding: 1.75rem clamp(1rem, 4vw, 1.75rem) 2rem;
        max-width: 1600px;
        margin: 0 auto;
    }

    .snippets-con{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
        padding: 1.75rem clamp(1rem, 4vw, 1.75rem) 2rem;
        grid-gap: ${props => props.theme.gridGap};
        transition: all 0.25s ease;
        max-width: 1600px;
        margin: 0 auto;
        @media screen and (max-width: 1260px){
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4rem 2rem;
        background: ${props => props.theme.colorBg2};
        border-radius: 1rem;
        border: 1px dashed ${props => props.theme.colorGrey2};

        svg {
            color: ${props => props.theme.colorGrey2};
            margin-bottom: 1.5rem;
        }

        h3 {
            color: ${props => props.theme.colorTextLight};
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        p {
            color: ${props => props.theme.colorGrey1};
            font-size: 1rem;
            margin-bottom: 2rem;
        }

        .btn-create {
            background: ${props => props.theme.colorPrimary || '#6c5ce7'};
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
            }
        }
    }
`;

export default Bookmarks