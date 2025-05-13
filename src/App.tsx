import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PermanentDrawerLeft from './components/PermanentDrawerLeft';
import SaldoPage from './pages/Saldo';
import TransferirPage from './pages/Transferir';
import ContaProvider from './contexts/ContaContext';

function App() {

  return (
    <ContaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PermanentDrawerLeft />}>
            <Route index element={<Navigate to="saldo" replace />} />
            <Route path="saldo" element={<SaldoPage />} />
            <Route path="transferir" element={<TransferirPage />} />
            <Route path="*" element={<Navigate to="/saldo" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContaProvider>

  )
}

export default App
