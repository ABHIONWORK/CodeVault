import Link from 'next/link';

export default function WorkspaceOnboarding() {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Welcome to CodeVault B2B
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    To get started, you need a workspace.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
                    <div>
                        <Link href="/workspace/create">
                            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create a New Workspace
                            </button>
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">Or</span>
                        </div>
                    </div>
                    <div>
                        <Link href="/workspace/join">
                            <button className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Join an Existing Workspace
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
