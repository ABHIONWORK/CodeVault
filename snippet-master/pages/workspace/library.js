import { useState } from 'react';

export default function TeamLibrary() {
    const [commentText, setCommentText] = useState('');

    // Mock data for UI demonstration
    const snippets = [
        {
            id: 1,
            title: 'React API Fetch Hook',
            code: 'const useFetch = (url) => { ... }',
            author: 'Jane Doe',
            comments: [
                { id: 1, author: 'Abhishek Kumar', content: 'Great snippet! We should use this across all components.' }
            ]
        }
    ];

    const handleComment = (e, snippetId) => {
        e.preventDefault();
        console.log('Posting comment on', snippetId, ':', commentText);
        setCommentText('');
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Team Library</h1>
                    <div className="flex space-x-2">
                        <input type="text" placeholder="Search team snippets..." className="rounded-md border-gray-700 bg-gray-800 text-white px-3 py-1" />
                        <button className="bg-indigo-600 px-3 py-1 rounded-md">Filter</button>
                    </div>
                </div>

                <div className="space-y-8">
                    {snippets.map((snippet) => (
                        <div key={snippet.id} className="bg-gray-800 shadow sm:rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                                <h3 className="text-lg leading-6 font-medium text-white">{snippet.title}</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-400">Shared by {snippet.author}</p>
                            </div>
                            <div className="px-4 py-5 sm:p-6 bg-gray-900">
                                <pre className="text-sm text-gray-300 font-mono">
                                    <code>{snippet.code}</code>
                                </pre>
                            </div>
                            
                            {/* Comments Section */}
                            <div className="px-4 py-4 sm:px-6 bg-gray-750 border-t border-gray-700">
                                <h4 className="text-sm font-medium text-gray-300 mb-4">Team Discussion</h4>
                                <ul className="space-y-4 mb-4">
                                    {snippet.comments.map(comment => (
                                        <li key={comment.id} className="text-sm">
                                            <span className="font-semibold text-indigo-400">{comment.author}: </span>
                                            <span className="text-gray-300">{comment.content}</span>
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={(e) => handleComment(e, snippet.id)} className="flex items-start space-x-4">
                                    <div className="min-w-0 flex-1">
                                        <textarea
                                            rows={2}
                                            className="block w-full rounded-md border-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900 text-white px-3 py-2"
                                            placeholder="Leave a comment or annotation..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                    >
                                        Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
