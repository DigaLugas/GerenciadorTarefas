import { useState } from 'react';
import { Chamado } from '../types';

interface ChamadoFormProps {
  initialData?: Chamado;
  onSave: (chamado: Chamado) => void;
  onCancel: () => void;
}

function ChamadoForm({ initialData, onSave, onCancel }: ChamadoFormProps) {
  const [chamado, setChamado] = useState<Chamado>(
    initialData || {
      id: 0,
      numero: '',
      empresa: '',
      assunto: '',
      estado: 'responder'
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChamado(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(chamado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">
        {initialData ? 'Editar Chamado' : 'Novo Chamado'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número do Chamado
        </label>
        <input
          type="text"
          name="numero"
          value={chamado.numero}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empresa
        </label>
        <input
          type="text"
          name="empresa"
          value={chamado.empresa}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assunto
        </label>
        <input
          type="text"
          name="assunto"
          value={chamado.assunto}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          name="estado"
          value={chamado.estado}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="responder">Responder</option>
          <option value="respondido">Respondido</option>
          <option value="a cobrar">A Cobrar</option>
        </select>
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

export default ChamadoForm;
