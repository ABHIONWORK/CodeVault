import { useState } from 'react';

export default function BillingDashboard() {
    const [loading, setLoading] = useState(false);
    
    // Mock data
    const currentTier = 'PRO';
    const activeUsers = 12;

    const handleManageBilling = async () => {
        setLoading(true);
        // Call backend POST /api/billing/portal to get the Stripe URL
        console.log("Redirecting to Stripe Customer Portal...");
        setTimeout(() => {
            alert('Redirecting to Stripe Customer Portal (Mock)');
            setLoading(false);
        }, 1000);
    };

    const handleUpgrade = async () => {
        setLoading(true);
        // Call backend POST /api/billing/checkout to get the Checkout URL
        console.log("Creating Stripe Checkout Session for ENTERPRISE...");
        setTimeout(() => {
            alert('Redirecting to Stripe Checkout (Mock)');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Workspace Billing</h1>

                <div className="bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-700 mb-8">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-850">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-white">Current Plan</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-400">You are currently on the {currentTier} plan.</p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800">
                            {currentTier}
                        </span>
                    </div>
                    <div className="border-t border-gray-700 px-4 py-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                            <p className="text-sm text-gray-300">
                                You have <strong>{activeUsers}</strong> active users. Your next invoice will be for <strong>${activeUsers * 15}.00</strong>.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleManageBilling}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-700 focus:outline-none"
                            >
                                Manage Billing & Invoices
                            </button>
                            <button
                                onClick={handleUpgrade}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                            >
                                Upgrade to Enterprise
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-700">
                    <div className="px-4 py-5 sm:px-6 bg-gray-850 border-b border-gray-700">
                        <h3 className="text-lg leading-6 font-medium text-white">Plan Limits</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                                <span>Team Members (Unlimited)</span>
                                <span>12 / ∞</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                                <span>AI Assistant Requests (500/mo limit)</span>
                                <span>342 / 500</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
