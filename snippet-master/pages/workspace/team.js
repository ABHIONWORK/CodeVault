import { useState } from 'react';

export default function TeamManagement() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('MEMBER');

    const handleInvite = (e) => {
        e.preventDefault();
        // TODO: Call API to invite user to organization
        console.log('Invited:', email, 'as', role);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Team Management</h1>
                
                <div className="bg-gray-800 shadow sm:rounded-lg mb-8">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-white">Invite Team Member</h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-400">
                            <p>Send an invitation link to add members to your workspace.</p>
                        </div>
                        <form className="mt-5 sm:flex sm:items-center" onSubmit={handleInvite}>
                            <div className="w-full sm:max-w-xs">
                                <input
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900 text-white px-3 py-2"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0 flex items-center">
                                <select 
                                    className="mr-3 block rounded-md border-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900 text-white px-3 py-2"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="MEMBER">Member</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:text-sm"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-white mb-4">Current Members</h3>
                        <ul className="divide-y divide-gray-700">
                            <li className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white">Abhishek Kumar</p>
                                    <p className="text-sm text-gray-400">admin@codevault.com</p>
                                </div>
                                <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Owner
                                    </span>
                                </div>
                            </li>
                            <li className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white">John Doe</p>
                                    <p className="text-sm text-gray-400">john@example.com</p>
                                </div>
                                <div className="flex items-center">
                                    <select className="mr-3 block rounded-md border-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs bg-gray-900 text-white px-2 py-1">
                                        <option>Member</option>
                                        <option>Admin</option>
                                    </select>
                                    <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
