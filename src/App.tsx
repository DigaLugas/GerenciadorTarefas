import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChamadosPage from './pages/ChamadosPage';
import VersoesPage from './pages/VersoesPage';
import Dashboard from './pages/Dashboard';
import RelatoriosPage from './pages/RelatoriosPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sistema de Gestão</h1>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
              <li><Link to="/chamados" className="hover:text-blue-200">Chamados</Link></li>
              <li><Link to="/versoes" className="hover:text-blue-200">Versões</Link></li>
              <li><Link to="/relatorios" className="hover:text-blue-200">Relatórios</Link></li>
            </ul>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chamados" element={<ChamadosPage />} />
            <Route path="/versoes" element={<VersoesPage />} />
            <Route path="/relatorios" element={<RelatoriosPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
