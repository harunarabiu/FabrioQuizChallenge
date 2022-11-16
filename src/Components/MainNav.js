import { UserCircleIcon } from '@heroicons/react/24/outline'
export default function Modal(props) {
    return (
        <>
            <div  className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className='text-white font-bold text-3xl'>QUIZO</span>
                    </div>
                    
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    <span className="text-gray-400">Welcome, {props?.user.first_name}</span>
                    <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                        
                    </button>
                    </div>
                </div>
                
                </div>
            </div>
            </div>

            <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-normal tracking-tight text-gray">Quiz Challenge</h1>
            </div>
            </header>
        </>
        
    )
}