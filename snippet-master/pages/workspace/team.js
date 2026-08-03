import { useState } from 'react';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import Private from '../../Components/auth/Private';

export default function TeamManagement() {
    const theme = useThemeContext();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('MEMBER');

    const handleInvite = (e) => {
        e.preventDefault();
        // TODO: Call API to invite user to organization
        console.log('Invited:', email, 'as', role);
        setEmail('');
    };

    return (
        <Layout>
            <MainContent>
                <Private>
                    <TeamStyled theme={theme}>
                        <div className="header-con">
                            <h1>Team Management</h1>
                        </div>
                        
                        <div className="card">
                            <div className="card-header">
                                <h3>Invite Team Member</h3>
                                <p>Send an invitation link to add members to your workspace.</p>
                            </div>
                            <div className="card-body">
                                <form className="invite-form" onSubmit={handleInvite}>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="action-group">
                                        <select 
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="MEMBER">Member</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                        <Button
                                            name={'Send Invite'}
                                            type={'submit'}
                                            selector={'btn-invite'}
                                            padding={'.8rem 1.5rem'}
                                            borderRad={'0.5rem'}
                                            fw={'bold'}
                                            fs={'1rem'}
                                            backgound={theme.colorPrimary || '#6c5ce7'}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Current Members</h3>
                            </div>
                            <div className="card-body p-0">
                                <ul className="member-list">
                                    <li className="member-item">
                                        <div className="member-info">
                                            <p className="name">Abhishek Kumar</p>
                                            <p className="email">admin@codevault.com</p>
                                        </div>
                                        <div className="member-role">
                                            <span className="badge owner">Owner</span>
                                        </div>
                                    </li>
                                    <li className="member-item">
                                        <div className="member-info">
                                            <p className="name">John Doe</p>
                                            <p className="email">john@example.com</p>
                                        </div>
                                        <div className="member-action">
                                            <select>
                                                <option>Member</option>
                                                <option>Admin</option>
                                            </select>
                                            <button className="btn-remove">Remove</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TeamStyled>
                </Private>
            </MainContent>
        </Layout>
    );
}

const TeamStyled = styled.div`
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
            
            h3 {
                color: ${props => props.theme.colorTextLight};
                font-size: 1.2rem;
                font-weight: 600;
            }
            p {
                color: ${props => props.theme.colorGrey2};
                margin-top: 0.5rem;
                font-size: 0.95rem;
            }
        }
        
        .card-body {
            padding: 1.5rem;
            
            &.p-0 {
                padding: 0;
            }
            
            .invite-form {
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
                
                .input-group {
                    flex: 1;
                    min-width: 250px;
                    
                    input {
                        width: 100%;
                        padding: 0.8rem 1.2rem;
                        border-radius: 0.5rem;
                        background: ${props => props.theme.colorBg3};
                        border: 1px solid ${props => props.theme.borderColor};
                        color: ${props => props.theme.colorTextLight};
                        outline: none;
                        font-size: 1rem;
                        
                        &:focus {
                            border-color: ${props => props.theme.colorPrimary};
                        }
                    }
                }
                
                .action-group {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    
                    select {
                        padding: 0.8rem 1.2rem;
                        border-radius: 0.5rem;
                        background: ${props => props.theme.colorBg3};
                        border: 1px solid ${props => props.theme.borderColor};
                        color: ${props => props.theme.colorTextLight};
                        outline: none;
                        font-size: 1rem;
                        cursor: pointer;
                        
                        &:focus {
                            border-color: ${props => props.theme.colorPrimary};
                        }
                    }
                }
            }
            
            .member-list {
                list-style: none;
                
                .member-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid ${props => props.theme.borderColor};
                    
                    &:last-child {
                        border-bottom: none;
                    }
                    
                    .member-info {
                        .name {
                            color: ${props => props.theme.colorTextLight};
                            font-weight: 600;
                            font-size: 1rem;
                        }
                        .email {
                            color: ${props => props.theme.colorGrey2};
                            font-size: 0.9rem;
                            margin-top: 0.25rem;
                        }
                    }
                    
                    .member-role {
                        .badge {
                            padding: 0.4rem 0.8rem;
                            border-radius: 2rem;
                            font-size: 0.8rem;
                            font-weight: 700;
                            
                            &.owner {
                                background: rgba(46, 204, 113, 0.2);
                                color: #2ecc71;
                            }
                        }
                    }
                    
                    .member-action {
                        display: flex;
                        gap: 1rem;
                        align-items: center;
                        
                        select {
                            padding: 0.5rem 1rem;
                            border-radius: 0.5rem;
                            background: ${props => props.theme.colorBg3};
                            border: 1px solid ${props => props.theme.borderColor};
                            color: ${props => props.theme.colorTextLight};
                            outline: none;
                            font-size: 0.9rem;
                        }
                        
                        .btn-remove {
                            background: transparent;
                            border: none;
                            color: ${props => props.theme.colorDanger || '#e74c3c'};
                            cursor: pointer;
                            font-weight: 500;
                            font-size: 0.9rem;
                            
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
`;

