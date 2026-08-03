import React, { useEffect, useState } from 'react';
import { isAuth } from '../../actions/auth';
import Link from 'next/link';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../Button/Button';

function OrganizationGuard({ children }) {
    const theme = useThemeContext();
    const [authenticated, setAuthenticated] = useState(true);
    const [hasOrganization, setHasOrganization] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authStatus = isAuth();
        setAuthenticated(authStatus);
        
        if (authStatus) {
            // Check if user has an organization
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.organization) {
                setHasOrganization(true);
            } else {
                setHasOrganization(false);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!authenticated) {
        return (
            <GuardStyled theme={theme}>
                <div className="error-card">
                    <h2>403 Unauthorized</h2>
                    <p>Please log in to access this workspace area.</p>
                    <Link href="/login">
                        <Button
                            name={'Log In'}
                            type={'button'}
                            selector={'btn-login'}
                            padding={'.8rem 2rem'}
                            borderRad={'0.8rem'}
                            fw={'bold'}
                            fs={'1.2rem'}
                            backgound={theme.colorPrimary || '#6c5ce7'}
                        />
                    </Link>
                </div>
            </GuardStyled>
        );
    }

    if (!hasOrganization) {
        return (
            <GuardStyled theme={theme}>
                <div className="error-card">
                    <h2>Workspace Required</h2>
                    <p>You need to create or join a Workspace to access these enterprise features.</p>
                    <div className="actions">
                        <Link href="/workspace/create">
                            <Button
                                name={'Create Workspace'}
                                type={'button'}
                                selector={'btn-create'}
                                padding={'.8rem 2rem'}
                                borderRad={'0.8rem'}
                                fw={'bold'}
                                fs={'1.1rem'}
                                backgound={theme.colorPrimary || '#6c5ce7'}
                            />
                        </Link>
                    </div>
                </div>
            </GuardStyled>
        );
    }

    return <>{children}</>;
}

const GuardStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 2rem;
    
    .error-card {
        background: ${props => props.theme.colorBg2};
        border-radius: 1rem;
        box-shadow: ${props => props.theme.shadow3};
        border: 1px solid ${props => props.theme.borderColor};
        padding: 3rem;
        text-align: center;
        max-width: 500px;
        width: 100%;
        
        h2 {
            color: ${props => props.theme.colorDanger || '#e74c3c'};
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        p {
            color: ${props => props.theme.colorGrey1};
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
    }
`;

export default OrganizationGuard;
