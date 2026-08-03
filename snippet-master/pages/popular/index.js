import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import { fetchSidebarData } from '../../actions/snippet'
import Loading from '../../Components/Loading/Loading'
import Snippet from '../../Components/Snippet/Snippet'
import { useSnippetContext } from '../../context/snippetContext'

function Popular() {
    const theme = useThemeContext()
    const { expandSnippet } = useSnippetContext()
    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSidebarData('popular').then(data => {
            if (data && !data.error) {
                setSnippets(data)
            }
            setLoading(false)
        })
    }, [])

    return (
        <Layout>
            <MainContent>
                <div className="main-title">
                    <h1>Popular Snippets</h1>
                </div>
                <div className="loading-con">
                    {loading && <Loading />}
                </div>
                {!loading && (
                    <SnippetsStyled theme={theme} expand={expandSnippet}>
                        {snippets.length === 0 ? (
                            <div className="empty-state">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                <h3>No popular snippets yet</h3>
                                <p>Be the first to share something amazing with the community!</p>
                                <button className="btn-create" onClick={() => window.location.href='/workspace/new-snippet'}>Create the first snippet!</button>
                            </div>
                        ) : (
                            snippets.map(snippet => (
                                <Snippet key={snippet.id} snippet={snippet} />
                            ))
                        )}
                    </SnippetsStyled>
                )}
            </MainContent>
        </Layout>
    )
}

const SnippetsStyled = styled.div`
    padding: 1.5rem;
    
    ${props => props.children?.props?.children?.length === 0 || props.children?.length === 0 ? `
        display: block;
    ` : `
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        grid-gap: 2rem;
        @media screen and (max-width: 1260px){
            grid-template-columns: repeat(1, 1fr);
        }
    `}

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
        grid-column: 1 / -1;

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

export default Popular