import { Route, Routes } from 'react-router-dom';
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
import { AuthProvider } from './context/auth'
import ProtectedRoute from './routes/ProtectedRoute'
import Rodape from './componentes/rodape/index.tsx';




function App() {
  return (
    <>
      <AuthProvider>
        <Cabecalho />
        <Navegacao />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas - requer login */}
          <Route path="/vegano" element={<ProtectedRoute><Vegano /></ProtectedRoute>} />
          <Route path="/bebidas" element={<ProtectedRoute><Bebidas /></ProtectedRoute>} />
          <Route path="/vegetariano" element={<ProtectedRoute><Vegetariano /></ProtectedRoute>} />
          <Route path="/salada" element={<ProtectedRoute><Salada /></ProtectedRoute>} />
          <Route path="/massas" element={<ProtectedRoute><Massas /></ProtectedRoute>} />
          <Route path="/lanches" element={<ProtectedRoute><Lanches /></ProtectedRoute>} />
          <Route path="/timer" element={<ProtectedRoute><Timer /></ProtectedRoute>} />
          <Route path="/carnes" element={<ProtectedRoute><Carnes /></ProtectedRoute>} />
          <Route path="/doces" element={<ProtectedRoute><Doces /></ProtectedRoute>} />
          <Route path="/principal" element={<ProtectedRoute><Principal /></ProtectedRoute>} />
       

          {/* Rota padrão */}
          <Route path="*" element={<Notfound />} />
        </Routes>
        
        <Rodape/>
      </AuthProvider>

    </>

  )
}

export default App;  
