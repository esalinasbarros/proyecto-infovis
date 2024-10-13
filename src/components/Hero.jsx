import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../../public/assets/Animation - 1728162778608.json'

function Hero() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center mb-8 md:mb-0">
            <h2 className="text-4xl font-extrabold mb-6 animate-fade-in-down">
              Visualiza las <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Finanzas</span> de tus Empresas Favoritas
            </h2>
            <p className="text-xl mb-8 animate-fade-in-up">
              Nuestra plataforma ofrece la forma más intuitiva y completa de visualizar información financiera compleja.
            </p>
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300">
                Ver acciones
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Lottie 
              animationData={animationData}
              className="w-64 h-64"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero