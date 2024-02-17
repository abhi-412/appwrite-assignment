import {LogoutBtn,Container} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/login",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "Profile",
      slug: "/user",
      active: authStatus,
  },
  {
    name: "Edit",
    slug: "/edit",
    active: authStatus,
  },
]


  return (
    <header className='py-3 flex items-start shadow bg-white'>

        <nav className='flex w-full lg:flex-row md:flex-row  flex-col lg:justify-between sm:items-start'>
          <div className='flex px-4 py-2 flex-start justify-start'>
            <h1 className='lg:text-4xl text-2xl font-bold'>Appwrite</h1>
          </div>
          <ul className='flex lg:flex-row md:flex-row lg:justify-end flex-col justify-start items-start ml-0'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='lg:text-xl  font-semibold px-6 py-2 duration-200 hover:text-cyan-600 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header