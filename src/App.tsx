// import { useState } from 'react'
import { ImageWithPreloader } from './components/ImageWithPreloader';
import { AIChat } from './components/AIChat';
import './App.css'

function App() {

  return (
    <>
        <ImageWithPreloader width={200} height={200} src="https://www.ai-imagelab.de/wp-content/uploads/2024/08/flux-bfl.jpeg" alt="desc" loaderSize={40} />
        <AIChat />
    </>
  )
}

export default App
