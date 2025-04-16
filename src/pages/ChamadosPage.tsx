import { useState, useEffect } from 'react';
import { Chamado } from '../types';
import { getChamados, saveChamados } from '../services/api';
import ChamadoForm from '../components/ChamadoForm';
import ChamadoList from '../components/ChamadoList';

function ChamadosPage() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingChamado, setEditingChamado] = useState<Chamado | null>(null);
  
  useEffect(() => {
    setChamados(getChamados());
  }, []);

  const handleSave = (chamado: Chamado) => {
    let newChamados: Chamado[];
    
    if (chamado.id) {
      newChamados = chamados.map(c => c.id === chamado.id ? chamado : c);
    } else {
      const newId = Math.max(0, ...chamados.map(c => c.id)) + 1;
      newChamados = [...chamados, { ...chamado, id: newId }];
    }
    
    setChamados(newChamados);
    saveChamados(newChamados);
    setIsModalOpen(false);
    setEditingChamado(null);
  };
  
  const handleEdit = (chamado: Chamado) => {
    setEditingChamado(chamado);
    setIsModalOpen(true);
  };
  
  const handleDelete = (id: number) => {
    const newChamados = chamados.filter(c => c.id !== id);
    setChamados(newChamados);
    saveChamados(newChamados);
  };
  
  const handleChangeStatus = (id: number, novoEstado: 'responder' | 'respondido' | 'a cobrar') => {
    const newChamados = chamados.map(c => {
      if (c.id === id) {
        // Se mudou para respondido, atualiza a data de resposta
        const dataResposta = novoEstado === 'respondido' ? new Date() : c.dataResposta;
        return { ...c, estado: novoEstado, dataResposta };
      }
      return c;
    });
    
    setChamados(newChamados);
    saveChamados(newChamados);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gerenciamento de Chamados</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Chamado
        </button>
      </div>
      
      <ChamadoList 
        chamados={chamados} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <ChamadoForm 
              initialData={editingChamado || undefined}
              onSave={handleSave}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingChamado(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChamadosPage;