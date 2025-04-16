import { Versao } from '../types';

interface VersaoListProps {
  versoes: Versao[];
  onEdit: (versao: Versao) => void;
  onDelete: (id: number) => void;
  onToggleConcluido: (id: number) => void;
}

function VersaoList({ versoes, onEdit, onDelete, onToggleConcluido }: VersaoListProps) {
  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
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
              Data
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {versoes.length > 0 ? (
            versoes.map((versao) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${versao.ambiente === 'produção' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {versao.ambiente.charAt(0).toUpperCase() + versao.ambiente.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${versao.concluido ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {versao.concluido ? 'Concluído' : 'Pendente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(versao.dataAtualizacao)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onToggleConcluido(versao.id)}
                      className={`${versao.concluido ? 'text-gray-600 hover:text-gray-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {versao.concluido ? 'Desfazer' : 'Concluir'}
                    </button>
                    <button
                      onClick={() => onEdit(versao)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(versao.id)}
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
              <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                Nenhuma versão encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VersaoList;