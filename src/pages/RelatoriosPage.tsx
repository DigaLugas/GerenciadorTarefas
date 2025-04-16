import { useState } from 'react';
import { getChamados, getVersoes } from '../services/api';
import ChamadosReport from '../components/reports/ChamadosReport';
import VersoesReport from '../components/reports/VersoesReport';

function RelatoriosPage() {
  const [reportType, setReportType] = useState<'chamados' | 'versoes'>('chamados');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  
  const chamados = getChamados();
  const versoes = getVersoes();
  
  const filteredChamados = chamados.filter(chamado => {
    if (!dateFrom && !dateTo) return true;
    
    const chamadoDate = chamado.dataResposta ? new Date(chamado.dataResposta) : new Date();
    
    if (dateFrom && dateTo) {
      return chamadoDate >= new Date(dateFrom) && chamadoDate <= new Date(dateTo);
    }
    
    if (dateFrom) {
      return chamadoDate >= new Date(dateFrom);
    }
    
    if (dateTo) {
      return chamadoDate <= new Date(dateTo);
    }
    
    return true;
  });
  
  const filteredVersoes = versoes.filter(versao => {
    if (!dateFrom && !dateTo) return true;
    
    const versaoDate = versao.dataAtualizacao ? new Date(versao.dataAtualizacao) : new Date();
    
    if (dateFrom && dateTo) {
      return versaoDate >= new Date(dateFrom) && versaoDate <= new Date(dateTo);
    }
    
    if (dateFrom) {
      return versaoDate >= new Date(dateFrom);
    }
    
    if (dateTo) {
      return versaoDate <= new Date(dateTo);
    }
    
    return true;
  });
  
  const downloadCSV = () => {
    let csvContent = '';
    let filename = '';
    
    if (reportType === 'chamados') {
      csvContent = 'ID,Número,Empresa,Assunto,Estado,Data Resposta\n';
      
      filteredChamados.forEach(chamado => {
        csvContent += `${chamado.id},${chamado.numero},"${chamado.empresa}","${chamado.assunto}",${chamado.estado},${chamado.dataResposta ? chamado.dataResposta.toLocaleDateString() : ''}\n`;
      });
      
      filename = 'relatorio-chamados.csv';
    } else {
      csvContent = 'ID,Sistema,Fornecedor,Versão Atual,Versão Atualizar,Concluído,Ambiente,Observações,Data Atualização\n';
      
      filteredVersoes.forEach(versao => {
        csvContent += `${versao.id},"${versao.sistema}",${versao.fornecedor},${versao.versaoAtual},${versao.versaoAtualizar},${versao.concluido ? 'Sim' : 'Não'},${versao.ambiente},"${versao.observacoes}",${versao.dataAtualizacao ? versao.dataAtualizacao.toLocaleDateString() : ''}\n`;
      });
      
      filename = 'relatorio-versoes.csv';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Relatórios</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Relatório</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'chamados' | 'versoes')}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="chamados">Chamados</option>
              <option value="versoes">Versões</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Baixar CSV
            </button>
          </div>
        </div>
      </div>
      
      {reportType === 'chamados' ? (
        <ChamadosReport chamados={filteredChamados} />
      ) : (
        <VersoesReport versoes={filteredVersoes} />
      )}
    </div>
  );
}

export default RelatoriosPage;

