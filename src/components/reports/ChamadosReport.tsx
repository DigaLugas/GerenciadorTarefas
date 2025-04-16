import { Chamado } from '../../types';

interface ChamadosReportProps {
  chamados: Chamado[];
}

function ChamadosReport({ chamados }: ChamadosReportProps) {
  // Estatísticas
  const totalChamados = chamados.length;
  const chamadosResponder = chamados.filter(c => c.estado === 'responder').length;
  const chamadosRespondidos = chamados.filter(c => c.estado === 'respondido').length;
  const chamadosACobrar = chamados.filter(c => c.estado === 'a cobrar').length;
  
  // Chamados por empresa
  const chamadosPorEmpresa = chamados.reduce((acc, chamado) => {
    acc[chamado.empresa] = (acc[chamado.empresa] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const empresasOrdenadas = Object.entries(chamadosPorEmpresa)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Estatísticas de Chamados</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-700">{totalChamados}</div>
            <div className="text-sm text-gray-500">Total de chamados</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">{chamadosResponder}</div>
            <div className="text-sm text-yellow-500">Para responder</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{chamadosRespondidos}</div>
            <div className="text-sm text-green-500">Respondidos</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-700">{chamadosACobrar}</div>
            <div className="text-sm text-red-500">A cobrar</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Chamados por Empresa</h3>
        
        <div className="space-y-2">
          {empresasOrdenadas.map(([empresa, count]) => (
            <div key={empresa} className="flex items-center">
              <div className="w-1/4 font-medium">{empresa}</div>
              <div className="w-3/4">
                <div className="flex items-center">
                  <div 
                    className="bg-blue-500 h-4 rounded"
                    style={{ width: `${(count / totalChamados) * 100}%` }}
                  ></div>
                  <span className="ml-2 text-sm text-gray-600">{count} ({Math.round((count / totalChamados) * 100)}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold">Lista de Chamados</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assunto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Resposta
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chamados.map((chamado) => (
                <tr key={chamado.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {chamado.numero}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {chamado.empresa}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {chamado.assunto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      chamado.estado === 'responder' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : chamado.estado === 'respondido'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {chamado.estado.charAt(0).toUpperCase() + chamado.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {chamado.dataResposta 
                      ? new Date(chamado.dataResposta).toLocaleDateString() 
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

export default ChamadosReport;