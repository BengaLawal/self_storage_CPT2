import AuthModal from './AuthModal'; // Update the import

export default function Nav() {
    return (
        <nav className="flex justify-between items-center p-4 text-white">
            <div className="text-2xl font-bold">Self Storage</div>

            <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-gray-300">Home</a>

                <AuthModal />

                {/* You can remove the separate signup button since it's now in the modal */}
            </div>
        </nav>
    );
};