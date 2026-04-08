import {Route, Routes} from 'react-router-dom';
import Cabecalho from './componentes/cabecalho';
import Navegacao from './componentes/navegacao';
import Home from './paginas/home.tsx';
import Timer from './paginas/timer.tsx';
import Vegano from './paginas/vegano.tsx';
import Bebidas from './paginas/bebidas.tsx';
import Cadastro from './paginas/cadastro.tsx';
import Vegetariano from './paginas/vegetariano.tsx';
import Salada from './paginas/salada.tsx';
import Massas from './paginas/massas.tsx';
import Lanches from './paginas/lanches.tsx';
import Carnes from './paginas/carnes.tsx';
import Doces from './paginas/doces.tsx';
import Principal from './paginas/principal.tsx';
import Notfound from './paginas/notfound.tsx';




function App() {
  return (
  <>
      <Cabecalho />
      <Navegacao />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vegano" element={<Vegano />} />
        <Route path="/bebidas" element={<Bebidas />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/vegetariano" element={<Vegetariano />} />
        <Route path="/salada" element={<Salada />} />
        <Route path="/massas" element={<Massas />} />
        <Route path="/lanches" element={<Lanches />} />
        <Route path="/timer" element={<Timer />} />     
        <Route path="/carnes" element={<Carnes />} />
        <Route path="/doces" element={<Doces />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

  </>

  )
}

export default App;  
