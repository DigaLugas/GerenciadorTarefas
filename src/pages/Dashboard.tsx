import { useState, useEffect } from 'react';
import { getChamados, getVersoes } from '../services/api';

function Dashboard() {
  const [chamadosAbertos, setChamadosAbertos] = useState<number>(0);
  const [chamadosACobrar, setChamadosACobrar] = useState<number>(0);
  const [versoesNaoConcluidas, setVersoesNaoConcluidas] = useState<number>(0);

  useEffect(() => {
    const chamados = getChamados();
    setChamadosAbertos(chamados.filter(c => c.estado === 'responder').length);
    setChamadosACobrar(chamados.filter(c => c.estado === 'a cobrar').length);
    
    const versoes = getVersoes();
    setVersoesNaoConcluidas(versoes.filter(v => !v.concluido).length);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Chamados para Responder</h3>
          <p className="text-4xl font-bold text-blue-600">{chamadosAbertos}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Chamados a Cobrar</h3>
          <p className="text-4xl font-bold text-red-600">{chamadosACobrar}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Versões Pendentes</h3>
          <p className="text-4xl font-bold text-yellow-600">{versoesNaoConcluidas}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;