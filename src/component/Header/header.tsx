import { useEffect, useState } from 'react';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link and useNavigate
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import type { UserInterface } from '../../types/loginResponse.types';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const reduxUser = useSelector((state: RootState) => state.userReducer.user);
const [user, setUser] = useState<UserInterface | null>(reduxUser);

  const navItems = [
    { label: 'Home', id: 'hero', to: '/' },
    { label: 'About', id: 'about', to: '/about' },

    { label: 'Contact', id: 'contact', to: '/contact' },
  ];
  useEffect(()=>{
    console.log("uaser is",reduxUser)
  })

  return (
    <header className={`transition-all duration-300`}>

      {/* proile pop up */}
      {isProfileOpen && <>
        <div onClick={()=>{setIsProfileOpen(false)}} className='fixed inset-0 bg-gray-200 opacity-60'>
        </div>

        <div className='absolute z-10 right-0 w-45 top-15 bg-white p-4'>
          <p>Hello, user.name </p>
          <p>name is :{user?.name}</p>
          <hr className='my-2 text-gray-300' />
          <p className='  transition-all duration-400 hover:font-semibold'>Orders</p>
          <p className=' transition-all duration-400 hover:font-semibold'>Wishlist</p>
          <p className='  transition-all duration-400 hover:font-semibold'>Cart</p>
          <hr className='my-2 text-gray-300' />
          <p className=' transition-all duration-400 hover:font-semibold'>Edit profile</p>
          <p className='  transition-all duration-400 hover:font-semibold'>Logout</p>

        </div>
      </>}
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
                className="text-gray-700 hover:underline transition-all hover:text-black duration-700 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4 items-center px-4 ">
            <Link to="/cart" className='hover:bg-gray-300 p-2 rounded-lg transition-background duration-300'>
              <ShoppingCart />
            </Link>

            <User onClick={() => { setIsProfileOpen(true) }} />


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

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-full left-0 w-full bg-red-400 shadow-lg">
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
