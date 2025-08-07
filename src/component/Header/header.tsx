import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link and useNavigate

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navItems = [
    { label: 'Home', id: 'hero', to: '/' },
    { label: 'About', id: 'about', to: '/about' },

    { label: 'Contact', id: 'contact', to: '/contact' },
  ];


  

  return (
    <header className={`transition-all duration-300` }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-900">
            Quick Bite
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              // <span className='text-lg font-semibold'>
 
              // </span> 
              <Link
                key={item.id}
                to={item.to}  // Use React Router's Link component
                className="text-gray-700 hover:underline transition-underline hover:text-black transition-colors duration-100 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='bg-yellow-400 text-white px-4 rounded py-1 hover:bg-yellow-500 transition-background duration-300'>
<Link to="/login">
            Login / Sign up
</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
            <nav className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}  // Use Link for navigation
                  className="text-gray-700 hover:text-black transition-colors duration-200 font-medium text-left py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
