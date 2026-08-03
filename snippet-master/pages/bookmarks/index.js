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
                                <div className="snippets-con">
                                    {snippets.length === 0 ? (
                                        <h3>You haven't bookmarked any snippets yet.</h3>
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
`;





export default Bookmarks