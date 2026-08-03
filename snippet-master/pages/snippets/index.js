import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import { useSnippetContext } from '../../context/snippetContext'
import Snippet from '../../Components/Snippet/Snippet'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import Loading from '../../Components/Loading/Loading'
import { isAuth, getCookie } from '../../actions/auth'
import { fetchSidebarData } from '../../actions/snippet'
import Link from 'next/link'

function Snippets() {
    const { expandSnippet } = useSnippetContext()
    const theme = useThemeContext()
    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)
    const authenticated = isAuth()

    useEffect(() => {
        if (authenticated) {
            const token = getCookie('token')
            fetchSidebarData('my-snippets', token).then(data => {
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
                    <h1>My Snippets</h1>
                </div>
                
                {!authenticated ? (
                    <div className="empty-state">
                        <h3>Please <Link href="/login">log in</Link> to view your snippets</h3>
                    </div>
                ) : (
                    <>
                        <div className="loading-con">
                            {loading && <Loading />}
                        </div>
                        {!loading && (
                            <AllSnippetsStyed theme={theme} expand={expandSnippet}>
                                {snippets.length === 0 ? (
                                    <h3>You haven't created any snippets yet.</h3>
                                ) : (
                                    snippets.map(snippet => (
                                        <Snippet key={snippet.id} snippet={snippet} />
                                    ))
                                )}
                            </AllSnippetsStyed>
                        )}
                    </>
                )}
            </MainContent>
        </Layout>
    )
}

const AllSnippetsStyed = styled.div`
    padding: 1.5rem;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-gap: 2rem;
    @media screen and (max-width: 1260px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

export default Snippets