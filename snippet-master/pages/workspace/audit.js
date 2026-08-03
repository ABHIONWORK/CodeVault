import { useState, useEffect } from 'react';

export default function AuditTrails() {
    // Mock audit logs
    const [logs, setLogs] = useState([
        { id: 1, action: 'CREATE', entityType: 'SNIPPET', entityId: 101, user: 'John Doe', timestamp: '2023-10-27 14:32:00' },
        { id: 2, action: 'UPDATE', entityType: 'SNIPPET', entityId: 101, user: 'John Doe', timestamp: '2023-10-27 15:00:12' },
        { id: 3, action: 'DELETE', entityType: 'SNIPPET', entityId: 99, user: 'Admin User', timestamp: '2023-10-28 09:15:45' }
    ]);

    const handleSimulate429 = () => {
        // Dispatching a custom event to trigger the global 429 handler in _app.js
        window.dispatchEvent(new CustomEvent('api_error_429'));
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Workspace Audit Trails</h1>
                    <button 
                        onClick={handleSimulate429}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Simulate Rate Limit (429)
                    </button>
                </div>

                <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entity ID</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.timestamp}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{log.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            log.action === 'CREATE' ? 'bg-green-100 text-green-800' :
                                            log.action === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.entityType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">#{log.entityId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
