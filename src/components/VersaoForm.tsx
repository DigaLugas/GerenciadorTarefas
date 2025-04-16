import { useState } from 'react';
import { Versao } from '../types';

interface VersaoFormProps {
  initialData?: Versao;
  onSave: (versao: Versao) => void;
  onCancel: () => void;
}

function VersaoForm({ initialData, onSave, onCancel }: VersaoFormProps) {
  const [versao, setVersao] = useState<Versao>(
    initialData || {
      id: 0,
      sistema: '',
      fornecedor: '',
      versaoAtual: '',
      versaoAtualizar: '',
      concluido: false,
      ambiente: 'homologação',
      observacoes: ''
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setVersao(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(versao);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">
        {initialData ? 'Editar Versão' : 'Nova Versão'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sistema
        </label>
        <input
          type="text"
          name="sistema"
          value={versao.sistema}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fornecedor
        </label>
        <select
          name="fornecedor"
          value={versao.fornecedor}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecione um fornecedor</option>
          <option value="CRK">CRK</option>
          <option value="Autbank">Autbank</option>
          <option value="Função">Função</option>
          <option value="Advice">Advice</option>
          <option value="EasyWay">EasyWay</option>
          <option value="JD">JD</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Versão Atual
          </label>
          <input
            type="text"
            name="versaoAtual"
            value={versao.versaoAtual}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Versão a Atualizar
          </label>
          <input
            type="text"
            name="versaoAtualizar"
            value={versao.versaoAtualizar}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>
      
      <div className="mb-4">
<label className="block text-sm font-medium text-gray-700 mb-1">
            Ambiente
          </label>
          <select
            name="ambiente"
            value={versao.ambiente}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="homologação">Homologação</option>
            <option value="produção">Produção</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <textarea
            name="observacoes"
            value={versao.observacoes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="concluido"
            name="concluido"
            checked={versao.concluido}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="concluido" className="ml-2 block text-sm text-gray-700">
            Concluído
          </label>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    );
}

export default VersaoForm;