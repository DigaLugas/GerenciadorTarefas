import { Versao } from '../../types';

interface VersoesReportProps {
  versoes: Versao[];
}

function VersoesReport({ versoes }: VersoesReportProps) {
  // Estatísticas
  const totalVersoes = versoes.length;
  const versoesConcluidas = versoes.filter(v => v.concluido).length;
  const versoesPendentes = totalVersoes - versoesConcluidas;
  const percentConcluido = totalVersoes > 0 
    ? Math.round((versoesConcluidas / totalVersoes) * 100) 
    : 0;
  
  // Versões por fornecedor
  const versoesPorFornecedor = versoes.reduce((acc, versao) => {
    acc[versao.fornecedor] = (acc[versao.fornecedor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const fornecedoresOrdenados = Object.entries(versoesPorFornecedor)
    .sort((a, b) => b[1] - a[1]);
  
  // Versões por ambiente
  const homologacao = versoes.filter(v => v.ambiente === 'homologação').length;
  const producao = versoes.filter(v => v.ambiente === 'produção').length;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Estatísticas de Versões</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-700">{totalVersoes}</div>
            <div className="text-sm text-gray-500">Total de versões</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{versoesConcluidas}</div>
            <div className="text-sm text-green-500">Concluídas</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">{versoesPendentes}</div>
            <div className="text-sm text-yellow-500">Pendentes</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-700">{percentConcluido}%</div>
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${percentConcluido}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-blue-500">Progresso</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Versões por Fornecedor</h3>
          
          <div className="space-y-2">
            {fornecedoresOrdenados.map(([fornecedor, count]) => (
              <div key={fornecedor} className="flex items-center">
                <div className="w-1/3 font-medium">{fornecedor}</div>
                <div className="w-2/3">
                  <div className="flex items-center">
                    <div 
                      className="bg-indigo-500 h-4 rounded"
                      style={{ width: `${(count / totalVersoes) * 100}%` }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Versões por Ambiente</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Homologação</span>
                <span className="text-sm text-gray-600">{homologacao} ({Math.round((homologacao / totalVersoes) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${(homologacao / totalVersoes) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Produção</span>
                <span className="text-sm text-gray-600">{producao} ({Math.round((producao / totalVersoes) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-purple-500 h-4 rounded-full" 
                  style={{ width: `${(producao / totalVersoes) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold">Lista de Versões</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sistema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Versão Atual → Atualizar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ambiente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Atualização
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {versoes.map((versao) => (
                <tr key={versao.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {versao.sistema}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {versao.fornecedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {versao.versaoAtual} → {versao.versaoAtualizar}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      versao.ambiente === 'homologação' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {versao.ambiente.charAt(0).toUpperCase() + versao.ambiente.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      versao.concluido
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {versao.concluido ? 'Concluído' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {versao.dataAtualizacao 
                      ? new Date(versao.dataAtualizacao).toLocaleDateString() 
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VersoesReport;