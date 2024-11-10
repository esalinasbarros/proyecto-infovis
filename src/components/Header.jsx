import React from 'react'
import { Menu, X } from 'lucide-react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const scrollToContent = () => {
    const contentElement = document.getElementById('content')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-gray-900 text-white p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Market
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">
            Lens
          </span>
        </h1>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <button
            onClick={() => {
              scrollToContent()
              setIsMenuOpen(false)
            }}
            className="block w-full text-left px-4 py-2 rounded-md bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-800 transition-colors duration-300"
          >
            Explore Markets
          </button>
        </div>
      )}
    </nav>
  )
}

export default Header