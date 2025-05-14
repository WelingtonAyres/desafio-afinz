import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PermanentDrawerLeft from './components/PermanentDrawerLeft';
import BalancePage from './pages/Balance';
import TransferPage from './pages/Transfer';
import AccountProvider from './contexts/AccountContext';

function App() {

  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PermanentDrawerLeft />}>
            <Route index element={<Navigate to="balance" replace />} />
            <Route path="balance" element={<BalancePage />} />
            <Route path="transfer" element={<TransferPage />} />
            <Route path="*" element={<Navigate to="/balance" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountProvider>

  )
}

export default App
