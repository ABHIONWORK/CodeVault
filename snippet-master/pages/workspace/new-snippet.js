import { useState } from 'react';

export default function NewSnippet() {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [visibility, setVisibility] = useState('PRIVATE');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: API Call to POST /api/snippets
        console.log({ title, code, visibility });
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Create New Snippet</h1>
                
                <form onSubmit={handleSubmit} className="bg-gray-800 shadow sm:rounded-lg p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Title</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900 text-white px-3 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Code</label>
                        <textarea
                            required
                            rows={10}
                            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900 text-white px-3 py-2 font-mono"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <fieldset>
                        <legend className="text-sm font-medium text-gray-300">Visibility (Personal vs Team)</legend>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="visibility-private"
                                    name="visibility"
                                    type="radio"
                                    checked={visibility === 'PRIVATE'}
                                    onChange={() => setVisibility('PRIVATE')}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-700 bg-gray-900"
                                />
                                <label htmlFor="visibility-private" className="ml-3 block text-sm font-medium text-white">
                                    Personal (Only me)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="visibility-organization"
                                    name="visibility"
                                    type="radio"
                                    checked={visibility === 'ORGANIZATION'}
                                    onChange={() => setVisibility('ORGANIZATION')}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-700 bg-gray-900"
                                />
                                <label htmlFor="visibility-organization" className="ml-3 block text-sm font-medium text-white">
                                    Team Workspace (My Organization)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="visibility-public"
                                    name="visibility"
                                    type="radio"
                                    checked={visibility === 'PUBLIC'}
                                    onChange={() => setVisibility('PUBLIC')}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-700 bg-gray-900"
                                />
                                <label htmlFor="visibility-public" className="ml-3 block text-sm font-medium text-white">
                                    Public (Everyone on CodeVault)
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Save Snippet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
