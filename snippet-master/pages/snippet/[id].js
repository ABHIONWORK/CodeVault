import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SnippetView() {
    const router = useRouter();
    const { id } = router.query;
    const [code, setCode] = useState('const example = () => { console.log("Hello, B2B World!"); };');
    
    // AI State
    const [aiProcessing, setAiProcessing] = useState(false);
    
    // GitHub State
    const [showGithubModal, setShowGithubModal] = useState(false);
    const [githubTarget, setGithubTarget] = useState('GIST'); // GIST or REPO
    const [repoName, setRepoName] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleAiAction = (prompt) => {
        setAiProcessing(true);
        // Mock API call to /api/integration/ai/suggest
        setTimeout(() => {
            const result = `// Auto-generated response for: ${prompt}\n` + code;
            setCode(result);
            setAiProcessing(false);
        }, 1500);
    };

    const handleGithubPush = (e) => {
        e.preventDefault();
        // Mock API call to /api/integration/github/push/{id}
        console.log('Pushing to GitHub...', { githubTarget, repoName, filePath });
        setShowGithubModal(false);
        alert('Snippet successfully pushed to GitHub!');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Main Editor Section */}
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Snippet Viewer #{id}</h1>
                    <button 
                        onClick={() => setShowGithubModal(true)}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2 border border-gray-600"
                    >
                        <span>Push to GitHub</span>
                    </button>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                    <textarea
                        className="w-full bg-transparent text-gray-300 font-mono focus:outline-none"
                        rows={20}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="w-80 bg-gray-800 border-l border-gray-700 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                    ✨ AI Assistant
                </h2>
                
                <div className="space-y-4">
                    <p className="text-sm text-gray-400 mb-4">Select an action to manipulate this snippet:</p>
                    
                    <button 
                        disabled={aiProcessing}
                        onClick={() => handleAiAction('Document this code')}
                        className="w-full text-left px-4 py-3 bg-gray-750 hover:bg-gray-700 rounded-md border border-gray-600 transition-colors"
                    >
                        📝 Auto-Document Code
                    </button>
                    
                    <button 
                        disabled={aiProcessing}
                        onClick={() => handleAiAction('Optimize this code')}
                        className="w-full text-left px-4 py-3 bg-gray-750 hover:bg-gray-700 rounded-md border border-gray-600 transition-colors"
                    >
                        ⚡ Optimize & Refactor
                    </button>
                    
                    <button 
                        disabled={aiProcessing}
                        onClick={() => handleAiAction('Explain this code')}
                        className="w-full text-left px-4 py-3 bg-gray-750 hover:bg-gray-700 rounded-md border border-gray-600 transition-colors"
                    >
                        🧠 Explain Logic
                    </button>

                    <button 
                        disabled={aiProcessing}
                        onClick={() => handleAiAction('Translate to Python')}
                        className="w-full text-left px-4 py-3 bg-gray-750 hover:bg-gray-700 rounded-md border border-gray-600 transition-colors"
                    >
                        🐍 Translate to Python
                    </button>

                    {aiProcessing && (
                        <div className="mt-6 text-center text-indigo-400 animate-pulse text-sm">
                            Thinking...
                        </div>
                    )}
                </div>
            </div>

            {/* GitHub Push Modal */}
            {showGithubModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 border border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Push to GitHub</h3>
                        <form onSubmit={handleGithubPush}>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-400 mb-2">Target</label>
                                <select 
                                    value={githubTarget} 
                                    onChange={(e) => setGithubTarget(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
                                >
                                    <option value="GIST">GitHub Gist</option>
                                    <option value="REPO">Repository</option>
                                </select>
                            </div>

                            {githubTarget === 'REPO' && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-sm text-gray-400 mb-2">Repository Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="username/repo"
                                            value={repoName}
                                            onChange={(e) => setRepoName(e.target.value)}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm text-gray-400 mb-2">File Path</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="src/utils/snippet.js"
                                            value={filePath}
                                            onChange={(e) => setFilePath(e.target.value)}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
                                        />
                                    </div>
                                </>
                            )}
                            
                            <div className="flex justify-end space-x-3 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setShowGithubModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white shadow-sm"
                                >
                                    Push Code
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
