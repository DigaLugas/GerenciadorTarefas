import { Chamado } from '../types';

interface ChamadoListProps {
  chamados: Chamado[];
  onEdit: (chamado: Chamado) => void;
  onDelete: (id: number) => void;
  onChangeStatus: (id: number, novoEstado: 'responder' | 'respondido' | 'a cobrar') => void;
}

function ChamadoList({ chamados, onEdit, onDelete, onChangeStatus }: ChamadoListProps) {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'responder':
        return 'bg-yellow-100 text-yellow-800';
      case 'respondido':
        return 'bg-green-100 text-green-800';
      case 'a cobrar':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
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
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {chamados.length > 0 ? (
            chamados.map((chamado) => (
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
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(chamado.estado)}`}>
                    {chamado.estado.charAt(0).toUpperCase() + chamado.estado.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <select
                      value={chamado.estado}
                      onChange={(e) => onChangeStatus(chamado.id, e.target.value as any)}
                      className="text-xs p-1 border border-gray-300 rounded"
                    >
                      <option value="responder">Responder</option>
                      <option value="respondido">Respondido</option>
                      <option value="a cobrar">A Cobrar</option>
                    </select>
                    <button
                      onClick={() => onEdit(chamado)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(chamado.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                Nenhum chamado encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ChamadoList;