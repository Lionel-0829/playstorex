import { useState, useEffect } from 'react'
import './Home.css'
import Footer from './Footer'

function Home() {
  const slides = [
    'https://via.placeholder.com/900x400?text=Imagen+1',
    'https://via.placeholder.com/900x400?text=Imagen+2',
    'https://via.placeholder.com/900x400?text=Imagen+3'
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="home-container">
      <div className="carousel">
        <img src={slides[index]} alt={`Slide ${index + 1}`} />
      </div>

      <div className="company-info">
        <h1>PlayStoreX</h1>
        <p>Venta de videojuegos y accesorios para Play, PC y consolas.</p>
        <p>Encuentra lanzamientos, clásicos y promos especiales.</p>
      </div>

      <Footer />
    </div>
  )
}

export default Home
