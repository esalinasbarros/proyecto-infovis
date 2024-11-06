import React from 'react'

function Header() {
  const scrollToContent = () => {
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='flex justify-between items-center text-white p-6'>
      <h1 className="text-5xl font-bold">
        Market<span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Lens</span>
      </h1>
    </nav>
  )
}

export default Header