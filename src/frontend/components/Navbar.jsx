import { useState } from 'react';
import { MdClose } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
const Navbar = ({ web3Handler, account }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-around items-center">
                <div className="text-white text-xl font-bold">
                    NFTopia
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <MdClose className="h-6 w-6" /> : <IoMenuOutline className="h-6 w-6" />}
                    </button>
                </div>
                <div className={`w-full md:w-auto ${isOpen ? 'block' : 'hidden'} md:flex items-center space-x-6`}>
                    <Link to="/" className="text-white hover:text-gray-300 block md:inline-block">Home</Link>
                    <Link to="/create" className="text-white hover:text-gray-300 block md:inline-block">Create</Link>
                    <Link to="/my-listed-items" className="text-white hover:text-gray-300 block md:inline-block">My Listed Items</Link>
                    <Link to="/my-purchases" className="text-white hover:text-gray-300 block md:inline-block">My Purchases</Link>
                </div>
                <div>
                    {account ? (
                        <a
                            href={`https://etherscan.io/address/${account}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-transparent border border-white rounded px-4 py-2 hover:bg-white hover:text-blue-600 transition-colors duration-300"
                        >
                            {`${account.slice(0, 5)}...${account.slice(-4)}`}
                        </a>
                    ) : (
                        <button
                            onClick={web3Handler}
                            className="text-white bg-transparent border border-white rounded px-4 py-2 hover:bg-white hover:text-blue-600 transition-colors duration-300"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
