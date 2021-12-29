import React from 'react'
import { Container } from 'react-bootstrap'
import { Header, Footer } from './components'
import { Home } from './screens'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome To ProShop</h1>
          <Home/>
        </Container>
      </main>
      <Footer />      
    </>
  )
}

export default App
