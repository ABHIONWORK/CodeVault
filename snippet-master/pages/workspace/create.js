import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import Private from '../../Components/auth/Private';

export default function CreateWorkspace() {
    const theme = useThemeContext();
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Call Java Spring Boot backend API to create Organization
        console.log('Creating workspace:', name);
        router.push('/workspace/team');
    };

    return (
        <Layout>
            <MainContent>
                <Private>
                    <CreateWorkspaceStyled theme={theme}>
                        <div className="center-container">
                            <div className="header-con">
                                <h1>Create a Workspace</h1>
                            </div>
                            
                            <div className="form-container">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Workspace Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="e.g. Acme Corp"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="submit-btn">
                                        <Button
                                            name={'Create & Continue'}
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
                            </div>
                        </div>
                    </CreateWorkspaceStyled>
                </Private>
            </MainContent>
        </Layout>
    );
}

const CreateWorkspaceStyled = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
    
    .center-container {
        width: 100%;
        max-width: 500px;
    }
    
    .header-con {
        margin-bottom: 2rem;
        text-align: center;
        
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
        padding: 2.5rem;
        
        form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                
                label {
                    color: ${props => props.theme.colorGrey1};
                    font-weight: 600;
                    font-size: 1rem;
                }
                
                input {
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
            }
            
            .submit-btn {
                margin-top: 1rem;
                display: flex;
                
                button {
                    width: 100%;
                }
            }
        }
    }
`;

