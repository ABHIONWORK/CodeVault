import { useState } from 'react';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import OrganizationGuard from '../../Components/auth/OrganizationGuard';

export default function BillingDashboard() {
    const theme = useThemeContext();
    const [loading, setLoading] = useState(false);
    
    // Mock data
    const currentTier = 'PRO';
    const activeUsers = 12;

    const handleManageBilling = async () => {
        setLoading(true);
        setTimeout(() => {
            alert('Redirecting to Stripe Customer Portal (Mock)');
            setLoading(false);
        }, 1000);
    };

    const handleUpgrade = async () => {
        setLoading(true);
        setTimeout(() => {
            alert('Redirecting to Stripe Checkout (Mock)');
            setLoading(false);
        }, 1000);
    };

    return (
        <Layout>
            <MainContent>
                <OrganizationGuard>
                    <BillingStyled theme={theme}>
                        <div className="header-con">
                            <h1>Workspace Billing</h1>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <h3>Current Plan</h3>
                                    <p>You are currently on the {currentTier} plan.</p>
                                </div>
                                <span className="badge">{currentTier}</span>
                            </div>
                            <div className="card-body action-area">
                                <div className="info">
                                    <p>
                                        You have <strong>{activeUsers}</strong> active users. Your next invoice will be for <strong>${activeUsers * 15}.00</strong>.
                                    </p>
                                </div>
                                <div className="buttons">
                                    <Button
                                        name={'Manage Billing'}
                                        type={'button'}
                                        selector={'btn-manage'}
                                        padding={'.8rem 1.5rem'}
                                        borderRad={'0.8rem'}
                                        fw={'bold'}
                                        fs={'1rem'}
                                        backgound={'transparent'}
                                        click={handleManageBilling}
                                    />
                                    <Button
                                        name={'Upgrade Plan'}
                                        type={'button'}
                                        selector={'btn-upgrade'}
                                        padding={'.8rem 1.5rem'}
                                        borderRad={'0.8rem'}
                                        fw={'bold'}
                                        fs={'1rem'}
                                        backgound={theme.colorPrimary || '#6c5ce7'}
                                        click={handleUpgrade}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Plan Limits</h3>
                            </div>
                            <div className="card-body limits">
                                <div className="limit-item">
                                    <div className="limit-text">
                                        <span>Team Members (Unlimited)</span>
                                        <span>12 / ∞</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: '10%', background: theme.colorPrimary }}></div>
                                    </div>
                                </div>

                                <div className="limit-item">
                                    <div className="limit-text">
                                        <span>AI Assistant Requests (500/mo limit)</span>
                                        <span>342 / 500</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: '68%', background: theme.colorSuccess || '#2ecc71' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BillingStyled>
                </OrganizationGuard>
            </MainContent>
        </Layout>
    );
}

const BillingStyled = styled.div`
    padding: 2rem;
    
    .header-con {
        margin-bottom: 2rem;
        h1 {
            color: ${props => props.theme.colorTextLight};
            font-size: 2.5rem;
            font-weight: 700;
        }
    }
    
    .card {
        background: ${props => props.theme.colorBg2};
        border-radius: 1rem;
        box-shadow: ${props => props.theme.shadow3};
        border: 1px solid ${props => props.theme.borderColor};
        margin-bottom: 2rem;
        overflow: hidden;
        
        .card-header {
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid ${props => props.theme.borderColor};
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            h3 {
                color: ${props => props.theme.colorTextLight};
                font-size: 1.2rem;
                font-weight: 600;
            }
            p {
                color: ${props => props.theme.colorGrey2};
                margin-top: 0.5rem;
            }
            
            .badge {
                background: ${props => props.theme.colorPrimary2};
                color: ${props => props.theme.colorWhite};
                padding: 0.5rem 1rem;
                border-radius: 2rem;
                font-weight: 700;
                font-size: 0.9rem;
            }
        }
        
        .card-body {
            padding: 1.5rem;
            
            &.action-area {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
                
                .info p {
                    color: ${props => props.theme.colorGrey0};
                    strong {
                        color: ${props => props.theme.colorTextLight};
                    }
                }
                
                .buttons {
                    display: flex;
                    gap: 1rem;
                    
                    .btn-manage {
                        border: 1px solid ${props => props.theme.borderColor} !important;
                        color: ${props => props.theme.colorTextLight} !important;
                        &:hover {
                            background: rgba(255,255,255,0.05) !important;
                        }
                    }
                }
            }
            
            &.limits {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                
                .limit-item {
                    .limit-text {
                        display: flex;
                        justify-content: space-between;
                        color: ${props => props.theme.colorGrey1};
                        margin-bottom: 0.5rem;
                        font-weight: 500;
                        font-size: 0.95rem;
                    }
                    
                    .progress-bar {
                        width: 100%;
                        height: 0.5rem;
                        background: ${props => props.theme.colorBg3};
                        border-radius: 1rem;
                        overflow: hidden;
                        
                        .progress {
                            height: 100%;
                            border-radius: 1rem;
                            transition: width 0.5s ease;
                        }
                    }
                }
            }
        }
    }
`;

