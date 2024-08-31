import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [ismenuopen, setismenuopen] = useState(false);
  const togglemenu = () => {
    setismenuopen(!ismenuopen)
  }

  console.log(ismenuopen)
  return (
    <div className="tw-w-[96vw]">
      <nav className="tw-bg-bgwhite">
        <div className='tw-h-[8vh] tw-flex tw-items-center tw-justify-between'>
          {/* logo */}
          <div className='tw-text-White tw-text-5xl tw-font-bold'>Howse</div>

          <div className='md:tw-hidden'>
            <button className='tw-text-White' onClick={togglemenu}>
              <svg
                fill='none'
                stroke='currentColor'
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                viewBox='0 0 20 20'
                className="tw-w-6 tw-h-6">

                <path d="M2 6h16M2 12h16M2 18h16"></path>

              </svg>
            </button>
          </div>
          <ul className='tw-hidden md:tw-flex tw-space-x-4'>
            <li className='tw-text-White tw-text-lg tw-font-[600]'><Link to="/">Home</Link></li>
            <li className='tw-text-White tw-text-lg tw-font-[600]'><Link to="/recipes">Recipes</Link></li>
          </ul>
        </div>

        {/* mobile menu */}
        {ismenuopen ? (
          <ul className='tw-flex-col md:tw-hidden'>
            <li className='tw-text-White tw-text-lg tw-font-[600]'><Link to="/">Home</Link></li>
            <li className='tw-text-White tw-text-lg tw-font-[600]'><Link to="/recipes">Recipes</Link></li>
          </ul>
        ) : null}

      </nav>
    </div>
  )
}




export default Header;
