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
                            <h3>No popular snippets found.</h3>
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
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-gap: 2rem;
    @media screen and (max-width: 1260px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

export default Popular