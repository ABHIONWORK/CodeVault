import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import { fetchSidebarData } from '../../actions/snippet'
import Loading from '../../Components/Loading/Loading'

function TopCreators() {
    const theme = useThemeContext()
    const [creators, setCreators] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSidebarData('top-creators').then(data => {
            if (data && !data.error) {
                setCreators(data)
            }
            setLoading(false)
        })
    }, [])

    return (
        <Layout>
            <MainContent>
                <div className="main-title">
                    <h1>Top Creators</h1>
                </div>
                <div className="loading-con">
                    {loading && <Loading />}
                </div>
                {!loading && (
                    <CreatorsStyled theme={theme}>
                        {creators.length === 0 ? (
                            <h3>No creators found.</h3>
                        ) : (
                            creators.map(creator => (
                                <div key={creator.id} className="creator-card">
                                    <div className="avatar">{creator.name.charAt(0).toUpperCase()}</div>
                                    <div className="info">
                                        <h4>{creator.name}</h4>
                                        <p>{creator.snippetCount} Snippets</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </CreatorsStyled>
                )}
            </MainContent>
        </Layout>
    )
}

const CreatorsStyled = styled.div`
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2rem;
    
    .creator-card {
        background: ${props => props.theme.colorBg2};
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: ${props => props.theme.shadow3};
        display: flex;
        align-items: center;
        gap: 1.5rem;
        
        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: ${props => props.theme.colorPrimary};
            color: ${props => props.theme.colorWhite};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
        }
        
        .info {
            h4 {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }
            p {
                color: ${props => props.theme.colorGrey2};
            }
        }
    }
`;

export default TopCreators