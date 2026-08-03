import { useState } from 'react';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import Private from '../../Components/auth/Private';

export default function NewSnippet() {
    const theme = useThemeContext();
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [visibility, setVisibility] = useState('PRIVATE');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: API Call to POST /api/snippets
        console.log({ title, code, visibility });
    };

    return (
        <Layout>
            <MainContent>
                <Private>
                    <NewSnippetStyled theme={theme}>
                        <div className="header-con">
                            <h1>Create New Snippet</h1>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="form-container">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. React API Fetch Hook"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Code</label>
                                <textarea
                                    required
                                    rows={10}
                                    placeholder="Paste your code here..."
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>

                            <fieldset className="visibility-group">
                                <legend>Visibility (Personal vs Team)</legend>
                                <div className="radio-options">
                                    <label className="radio-label">
                                        <input
                                            name="visibility"
                                            type="radio"
                                            checked={visibility === 'PRIVATE'}
                                            onChange={() => setVisibility('PRIVATE')}
                                        />
                                        <span className="radio-text">Personal (Only me)</span>
                                    </label>
                                    
                                    <label className="radio-label">
                                        <input
                                            name="visibility"
                                            type="radio"
                                            checked={visibility === 'ORGANIZATION'}
                                            onChange={() => setVisibility('ORGANIZATION')}
                                        />
                                        <span className="radio-text">Team Workspace (My Organization)</span>
                                    </label>
                                    
                                    <label className="radio-label">
                                        <input
                                            name="visibility"
                                            type="radio"
                                            checked={visibility === 'PUBLIC'}
                                            onChange={() => setVisibility('PUBLIC')}
                                        />
                                        <span className="radio-text">Public (Everyone on CodeVault)</span>
                                    </label>
                                </div>
                            </fieldset>

                            <div className="submit-btn">
                                <Button
                                    name={'Save Snippet'}
                                    type={'submit'}
                                    selector={'btn-submit'}
                                    padding={'.8rem 1.5rem'}
                                    borderRad={'0.8rem'}
                                    fw={'bold'}
                                    fs={'1.2rem'}
                                    backgound={theme.colorPrimary || '#6c5ce7'}
                                />
                            </div>
                        </form>
                    </NewSnippetStyled>
                </Private>
            </MainContent>
        </Layout>
    );
}

const NewSnippetStyled = styled.div`
    padding: 2rem;
    
    .header-con {
        margin-bottom: 2rem;
        
        h1 {
            color: ${props => props.theme.colorTextLight};
            font-size: 2.5rem;
            font-weight: 700;
        }
    }
    
    .form-container {
        background: ${props => props.theme.colorBg2};
        border-radius: 1rem;
        box-shadow: ${props => props.theme.shadow3};
        border: 1px solid ${props => props.theme.borderColor};
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 800px;
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            
            label {
                color: ${props => props.theme.colorGrey1};
                font-weight: 600;
                font-size: 1rem;
            }
            
            input, textarea {
                padding: 1rem;
                border-radius: 0.5rem;
                background: ${props => props.theme.colorBg3};
                border: 1px solid ${props => props.theme.borderColor};
                color: ${props => props.theme.colorTextLight};
                outline: none;
                font-size: 1rem;
                transition: all 0.3s ease;
                
                &:focus {
                    border-color: ${props => props.theme.colorPrimary};
                    box-shadow: 0 0 0 2px ${props => props.theme.colorPrimary + '40'};
                }
            }
            
            textarea {
                font-family: 'Fira Code', monospace;
                resize: vertical;
                min-height: 200px;
            }
        }
        
        .visibility-group {
            border: none;
            padding: 0;
            margin: 0;
            
            legend {
                color: ${props => props.theme.colorGrey1};
                font-weight: 600;
                font-size: 1rem;
                margin-bottom: 1rem;
            }
            
            .radio-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                
                .radio-label {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    cursor: pointer;
                    
                    input[type="radio"] {
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border: 2px solid ${props => props.theme.colorGrey2};
                        border-radius: 50%;
                        outline: none;
                        background: transparent;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        position: relative;
                        
                        &:checked {
                            border-color: ${props => props.theme.colorPrimary};
                            
                            &::after {
                                content: '';
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: ${props => props.theme.colorPrimary};
                            }
                        }
                    }
                    
                    .radio-text {
                        color: ${props => props.theme.colorTextLight};
                        font-size: 1rem;
                    }
                }
            }
        }
        
        .submit-btn {
            margin-top: 1rem;
            display: flex;
            
            button {
                width: 100%;
            }
        }
    }
`;

