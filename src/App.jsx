import './App.css'
import ListCliente from './ListCliente';
import CreateCliente from './CreateCliente';
import EditCliente from './EditCliente';
import InfoApp from './InfoApp';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <>
          <div className='App'>
          <BrowserRouter>
          <h1 className='titolo'><a href="/">Lista di clienti</a></h1>
            <nav className='menu'>
              <ul>
                <li>
                  <Link to="/">Tutti i clienti</Link>
                </li>
                <li>
                  <Link to="cliente/create">Crea un nuovo cliente</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route index element={<ListCliente/>}/>
              <Route path="cliente/create" element={<CreateCliente/>}/>
              <Route path="cliente/:id/edit" element={<EditCliente/>}/>
              <Route path="info" element={<InfoApp/>}/>
            </Routes>           
          </BrowserRouter>
      </div>
    </>
  )
}

export default App
