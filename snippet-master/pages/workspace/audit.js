import { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import MainContent from '../../Components/MainContent/MainContent';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import Button from '../../Components/Button/Button';
import OrganizationGuard from '../../Components/auth/OrganizationGuard';
import { getCookie } from '../../actions/auth';

export default function AuditTrails() {
    const theme = useThemeContext();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuditTrails = async () => {
            const token = getCookie('token');
            try {
                const res = await fetch('https://codevault-backend-01wi.onrender.com/api/v1/workspace/audit-trails', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setLogs(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAuditTrails();
    }, []);

    const handleSimulate429 = () => {
        window.dispatchEvent(new CustomEvent('api_error_429'));
    };

    return (
        <Layout>
            <MainContent>
                <OrganizationGuard>
                    <AuditStyled theme={theme}>
                        <div className="header-con">
                            <h1>Workspace Audit Trails</h1>
                            <Button
                                name={'Simulate Rate Limit (429)'}
                                type={'button'}
                                selector={'btn-danger'}
                                padding={'.8rem 1.5rem'}
                                borderRad={'0.8rem'}
                                fw={'bold'}
                                fs={'1.2rem'}
                                backgound={theme.colorDanger || '#e74c3c'}
                                click={handleSimulate429}
                            />
                        </div>
                        <div className="table-con">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id}>
                                            <td>{log.timestamp}</td>
                                            <td className="user-col">{log.user}</td>
                                            <td>
                                                <span className={`badge ${log.action ? log.action.toLowerCase() : 'unknown'}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AuditStyled>
                </OrganizationGuard>
            </MainContent>
        </Layout>
    );
}

const AuditStyled = styled.div`
    padding: 2rem;
    
    .header-con {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        
        h1 {
            color: ${props => props.theme.colorTextLight};
            font-size: 2.5rem;
            font-weight: 700;
        }
    }
    
    .table-con {
        background: ${props => props.theme.colorBg2};
        border-radius: 1rem;
        box-shadow: ${props => props.theme.shadow3};
        overflow: hidden;
        border: 1px solid ${props => props.theme.borderColor};
        
        table {
            width: 100%;
            border-collapse: collapse;
            
            thead {
                background: rgba(255, 255, 255, 0.03);
                border-bottom: 1px solid ${props => props.theme.borderColor};
                
                th {
                    padding: 1rem 1.5rem;
                    text-align: left;
                    color: ${props => props.theme.colorGrey2};
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                }
            }
            
            tbody {
                tr {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                    
                    &:hover {
                        background: rgba(255, 255, 255, 0.02);
                    }
                    
                    &:last-child {
                        border-bottom: none;
                    }
                    
                    td {
                        padding: 1rem 1.5rem;
                        color: ${props => props.theme.colorGrey0};
                        
                        &.user-col {
                            color: ${props => props.theme.colorTextLight};
                            font-weight: 500;
                        }
                        
                        .badge {
                            padding: 0.4rem 0.8rem;
                            border-radius: 2rem;
                            font-size: 0.8rem;
                            font-weight: 700;
                            
                            &.create {
                                background: rgba(46, 204, 113, 0.2);
                                color: #2ecc71;
                            }
                            &.update {
                                background: rgba(52, 152, 219, 0.2);
                                color: #3498db;
                            }
                            &.delete {
                                background: rgba(231, 76, 60, 0.2);
                                color: #e74c3c;
                            }
                        }
                    }
                }
            }
        }
    }
`;

