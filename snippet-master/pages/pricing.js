import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pricing() {
    const router = useRouter();

    const handleSubscribe = (tier) => {
        // In reality, if logged in, push to checkout. If not, push to register.
        console.log("Selected Tier:", tier);
        router.push('/register');
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-extrabold sm:text-5xl">Pricing Plans</h1>
                <p className="mt-4 text-xl text-gray-400">
                    Simple, transparent pricing for teams of all sizes. Scale your snippet management seamlessly.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
                {/* Free Tier */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-xl flex flex-col">
                    <h3 className="text-2xl font-semibold mb-2">Free</h3>
                    <p className="text-gray-400 mb-6">Perfect for students and individuals.</p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold">$0</span>
                        <span className="text-gray-400">/month</span>
                    </div>
                    <ul className="mb-8 flex-1 space-y-4">
                        <li className="flex items-center text-gray-300">✅ Up to 3 team members</li>
                        <li className="flex items-center text-gray-300">✅ 100 private snippets</li>
                        <li className="flex items-center text-gray-300">✅ Basic search</li>
                    </ul>
                    <button 
                        onClick={() => handleSubscribe('FREE')}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                    >
                        Get Started
                    </button>
                </div>

                {/* Pro Tier */}
                <div className="bg-gradient-to-b from-indigo-900 to-gray-800 rounded-2xl border border-indigo-500 p-8 shadow-2xl flex flex-col relative transform lg:-translate-y-4">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">
                        Most Popular
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                    <p className="text-gray-300 mb-6">For professional engineering teams.</p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold">$15</span>
                        <span className="text-gray-300">/user/month</span>
                    </div>
                    <ul className="mb-8 flex-1 space-y-4">
                        <li className="flex items-center text-gray-200">✨ Unlimited team members</li>
                        <li className="flex items-center text-gray-200">✨ Unlimited snippets</li>
                        <li className="flex items-center text-gray-200">✨ AI Assistant (500 requests/mo)</li>
                        <li className="flex items-center text-gray-200">✨ Push to GitHub Gist</li>
                    </ul>
                    <button 
                        onClick={() => handleSubscribe('PRO')}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition"
                    >
                        Start Free Trial
                    </button>
                </div>

                {/* Enterprise Tier */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-xl flex flex-col">
                    <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                    <p className="text-gray-400 mb-6">Advanced security and custom integrations.</p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold">$49</span>
                        <span className="text-gray-400">/user/month</span>
                    </div>
                    <ul className="mb-8 flex-1 space-y-4">
                        <li className="flex items-center text-gray-300">🛡️ Everything in Pro</li>
                        <li className="flex items-center text-gray-300">🛡️ Advanced Audit Trails</li>
                        <li className="flex items-center text-gray-300">🛡️ Direct GitHub Repo Push</li>
                        <li className="flex items-center text-gray-300">🛡️ Custom Rate Limits</li>
                    </ul>
                    <button 
                        onClick={() => handleSubscribe('ENTERPRISE')}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                    >
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    );
}
