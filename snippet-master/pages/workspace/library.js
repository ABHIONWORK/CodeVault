import { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import OrganizationGuard from '../../Components/auth/OrganizationGuard';
import { getCookie } from '../../actions/auth';

export default function TeamLibrary() {
    const theme = useThemeContext();
    const [commentText, setCommentText] = useState('');
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibrary = async () => {
            const token = getCookie('token');
            try {
                const res = await fetch('https://codevault-backend-01wi.onrender.com/api/v1/workspace/library', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setSnippets(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLibrary();
    }, []);

    const handleComment = (e, snippetId) => {
        e.preventDefault();
        console.log('Posting comment on', snippetId, ':', commentText);
        setCommentText('');
    };

    return (
        <Layout>
            <MainContent>
                <OrganizationGuard>
                    <LibraryStyled theme={theme}>
                        <div className="header-con">
                            <h1>Team Library</h1>
                            <div className="search-bar">
                                <input type="text" placeholder="Search team snippets..." />
                                <Button
                                    name={'Filter'}
                                    type={'button'}
                                    selector={'btn-filter'}
                                    padding={'.5rem 1.2rem'}
                                    borderRad={'0.5rem'}
                                    fw={'bold'}
                                    fs={'1rem'}
                                    backgound={theme.colorPrimary || '#6c5ce7'}
                                />
                            </div>
                        </div>

                        <div className="snippets-list">
                            {loading ? (
                                <div style={{textAlign: 'center', padding: '2rem', color: theme.colorGrey1}}>Loading...</div>
                            ) : snippets.length === 0 ? (
                                <div style={{textAlign: 'center', padding: '3rem', color: theme.colorGrey1, background: theme.colorBg2, borderRadius: '1rem'}}>
                                    <h3>No team snippets yet.</h3>
                                    <p>Share a snippet with your organization to see it here.</p>
                                </div>
                            ) : (
                                snippets.map((snippet) => (
                                    <div key={snippet.id} className="snippet-card">
                                        <div className="card-header">
                                            <h3>{snippet.title}</h3>
                                            <p>Shared by {snippet.author}</p>
                                        </div>
                                        <div className="card-code">
                                            <pre><code>{snippet.code || '// No code provided'}</code></pre>
                                        </div>
                                        
                                        <div className="card-comments">
                                            <h4>Team Discussion</h4>
                                            <ul>
                                                {snippet.comments && snippet.comments.map(comment => (
                                                    <li key={comment.id}>
                                                        <span className="author">{comment.author}: </span>
                                                        <span className="content">{comment.content}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <form onSubmit={(e) => handleComment(e, snippet.id)}>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Leave a comment or annotation..."
                                                    value={commentText}
                                                    onChange={(e) => setCommentText(e.target.value)}
                                                />
                                                <Button
                                                    name={'Post'}
                                                    type={'submit'}
                                                    selector={'btn-post'}
                                                    padding={'.6rem 1.5rem'}
                                                    borderRad={'0.5rem'}
                                                    fw={'bold'}
                                                    fs={'1rem'}
                                                    backgound={theme.colorPrimary || '#6c5ce7'}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </LibraryStyled>
                </OrganizationGuard>
            </MainContent>
        </Layout>
    );
}

const LibraryStyled = styled.div`
    padding: 2rem;
    
    .header-con {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
        
        h1 {
            color: ${props => props.theme.colorTextLight};
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .search-bar {
            display: flex;
            gap: 1rem;
            align-items: center;
            
            input {
                padding: 0.6rem 1.2rem;
                border-radius: 0.5rem;
                background: ${props => props.theme.colorBg3};
                border: 1px solid ${props => props.theme.borderColor};
                color: ${props => props.theme.colorTextLight};
                outline: none;
                
                &:focus {
                    border-color: ${props => props.theme.colorPrimary};
                }
            }
        }
    }
    
    .snippets-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        .snippet-card {
            background: ${props => props.theme.colorBg2};
            border-radius: 1rem;
            box-shadow: ${props => props.theme.shadow3};
            border: 1px solid ${props => props.theme.borderColor};
            overflow: hidden;
            
            .card-header {
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.03);
                border-bottom: 1px solid ${props => props.theme.borderColor};
                
                h3 {
                    color: ${props => props.theme.colorTextLight};
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                p {
                    color: ${props => props.theme.colorGrey2};
                    margin-top: 0.25rem;
                    font-size: 0.9rem;
                }
            }
            
            .card-code {
                padding: 1.5rem;
                background: #1e1e1e;
                
                pre {
                    color: #d4d4d4;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.95rem;
                    overflow-x: auto;
                }
            }
            
            .card-comments {
                padding: 1.5rem;
                border-top: 1px solid ${props => props.theme.borderColor};
                background: rgba(255, 255, 255, 0.01);
                
                h4 {
                    color: ${props => props.theme.colorGrey1};
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }
                
                ul {
                    list-style: none;
                    margin-bottom: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    
                    li {
                        font-size: 0.95rem;
                        
                        .author {
                            color: ${props => props.theme.colorPrimary2};
                            font-weight: 600;
                        }
                        
                        .content {
                            color: ${props => props.theme.colorGrey0};
                        }
                    }
                }
                
                form {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-start;
                    
                    textarea {
                        flex: 1;
                        padding: 0.8rem 1.2rem;
                        border-radius: 0.5rem;
                        background: ${props => props.theme.colorBg3};
                        border: 1px solid ${props => props.theme.borderColor};
                        color: ${props => props.theme.colorTextLight};
                        outline: none;
                        resize: none;
                        
                        &:focus {
                            border-color: ${props => props.theme.colorPrimary};
                        }
                    }
                }
            }
        }
    }
`;

