import { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import OrganizationGuard from '../../Components/auth/OrganizationGuard';
import { getCookie } from '../../actions/auth';

export default function BillingDashboard() {
    const theme = useThemeContext();
    const [loading, setLoading] = useState(true);
    const [billingInfo, setBillingInfo] = useState({ plan: 'FREE' });

    useEffect(() => {
        const fetchBillingInfo = async () => {
            const token = getCookie('token');
            try {
                const res = await fetch('https://codevault-backend-01wi.onrender.com/api/v1/workspace/billing', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBillingInfo(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBillingInfo();
    }, []);

    const handleManageBilling = async () => {
        alert('Redirecting to Stripe Customer Portal (Mock)');
    };

    const handleUpgrade = async (plan) => {
        alert(`Redirecting to Stripe Checkout for ${plan} (Mock)`);
    };

    const plans = [
        { name: 'FREE', price: '$0', features: ['Up to 3 members', '100 snippets', 'Community support'] },
        { name: 'PRO', price: '$15', features: ['Unlimited members', 'Unlimited snippets', 'Priority support', 'AI Assistant (500/mo)'] },
        { name: 'ENTERPRISE', price: 'Custom', features: ['SSO & SAML', 'Custom contracts', 'Dedicated success manager', 'Unlimited AI'] }
    ];

    return (
        <Layout>
            <MainContent>
                <OrganizationGuard>
                    <BillingStyled theme={theme}>
                        <div className="header-con">
                            <h1>Workspace Billing</h1>
                            {loading && <span style={{ color: theme.colorGrey1 }}>Loading billing status...</span>}
                        </div>

                        <div className="pricing-grid">
                            {plans.map(plan => {
                                const isActive = billingInfo.plan === plan.name;
                                return (
                                    <div key={plan.name} className={`pricing-card ${isActive ? 'active' : ''}`}>
                                        {isActive && <div className="active-badge">Current Plan</div>}
                                        <h3>{plan.name}</h3>
                                        <div className="price">{plan.price}<span>/mo</span></div>
                                        <ul className="features">
                                            {plan.features.map((feature, i) => (
                                                <li key={i}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colorPrimary || '#6c5ce7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="card-action">
                                            {isActive ? (
                                                <Button
                                                    name={'Manage Subscription'}
                                                    type={'button'}
                                                    selector={'btn-manage'}
                                                    padding={'.8rem 1.5rem'}
                                                    borderRad={'0.8rem'}
                                                    fw={'bold'}
                                                    fs={'1rem'}
                                                    backgound={'transparent'}
                                                    click={handleManageBilling}
                                                />
                                            ) : (
                                                <Button
                                                    name={'Upgrade Plan'}
                                                    type={'button'}
                                                    selector={'btn-upgrade'}
                                                    padding={'.8rem 1.5rem'}
                                                    borderRad={'0.8rem'}
                                                    fw={'bold'}
                                                    fs={'1rem'}
                                                    backgound={theme.colorPrimary || '#6c5ce7'}
                                                    click={() => handleUpgrade(plan.name)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            color: ${props => props.theme.colorTextLight};
            font-size: 2.5rem;
            font-weight: 700;
        }
    }
    
    .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
        
        .pricing-card {
            background: ${props => props.theme.colorBg2};
            border-radius: 1rem;
            box-shadow: ${props => props.theme.shadow3};
            border: 1px solid ${props => props.theme.borderColor};
            padding: 2.5rem 2rem;
            position: relative;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            
            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            }
            
            &.active {
                border-color: ${props => props.theme.colorPrimary};
                background: linear-gradient(180deg, ${props => props.theme.colorBg2} 0%, rgba(108, 92, 231, 0.05) 100%);
            }
            
            .active-badge {
                position: absolute;
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                background: ${props => props.theme.colorPrimary};
                color: white;
                padding: 0.3rem 1rem;
                border-radius: 2rem;
                font-size: 0.8rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            h3 {
                color: ${props => props.theme.colorGrey2};
                font-size: 1.2rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 1rem;
            }
            
            .price {
                font-size: 3rem;
                font-weight: 800;
                color: ${props => props.theme.colorTextLight};
                margin-bottom: 2rem;
                
                span {
                    font-size: 1rem;
                    color: ${props => props.theme.colorGrey2};
                    font-weight: 500;
                }
            }
            
            .features {
                list-style: none;
                margin-bottom: 2.5rem;
                flex-grow: 1;
                
                li {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: ${props => props.theme.colorGrey0};
                    margin-bottom: 1rem;
                    font-size: 1rem;
                }
            }
            
            .card-action {
                margin-top: auto;
                
                .btn-manage {
                    width: 100%;
                    border: 1px solid ${props => props.theme.colorPrimary} !important;
                    color: ${props => props.theme.colorPrimary} !important;
                    background: rgba(108, 92, 231, 0.1) !important;
                    
                    &:hover {
                        background: rgba(108, 92, 231, 0.2) !important;
                    }
                }
                
                .btn-upgrade {
                    width: 100%;
                }
            }
        }
    }
`;

