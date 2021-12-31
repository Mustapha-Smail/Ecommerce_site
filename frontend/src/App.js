import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Header, Footer } from './components'
import { Home, Product, Cart } from './screens'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/product/:id' element={<Product />} /> 

            {/* ROUTE WITH OPTIONAL PARAMS v6 */}
            <Route path='/cart'>                      
              <Route path=':id' element={<Cart />} />  
              <Route path='' element={<Cart />} />  
            </Route>  
            
          </Routes>
        </Container>
      </main>
      <Footer />      
    </Router>
  )
}

export default App
