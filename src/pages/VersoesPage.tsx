import { useState, useEffect } from 'react';
import { Versao } from '../types';
import { getVersoes, saveVersoes } from '../services/api';
import VersaoForm from '../components/VersaoForm';
import VersaoList from '../components/VersaoList';

function VersoesPage() {
  const [versoes, setVersoes] = useState<Versao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingVersao, setEditingVersao] = useState<Versao | null>(null);
  
  useEffect(() => {
    setVersoes(getVersoes());
  }, []);

  const handleSave = (versao: Versao) => {
    let newVersoes: Versao[];
    
    if (versao.id) {
      newVersoes = versoes.map(v => v.id === versao.id ? versao : v);
    } else {
      const newId = Math.max(0, ...versoes.map(v => v.id)) + 1;
      newVersoes = [...versoes, { ...versao, id: newId }];
    }
    
    setVersoes(newVersoes);
    saveVersoes(newVersoes);
    setIsModalOpen(false);
    setEditingVersao(null);
  };
  
  const handleEdit = (versao: Versao) => {
    setEditingVersao(versao);
    setIsModalOpen(true);
  };
  
  const handleDelete = (id: number) => {
    const newVersoes = versoes.filter(v => v.id !== id);
    setVersoes(newVersoes);
    saveVersoes(newVersoes);
  };
  
  const toggleConcluido = (id: number) => {
    const newVersoes = versoes.map(v => {
      if (v.id === id) {
        return { 
          ...v, 
          concluido: !v.concluido,
          dataAtualizacao: !v.concluido ? new Date() : v.dataAtualizacao
        };
      }
      return v;
    });
    
    setVersoes(newVersoes);
    saveVersoes(newVersoes);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Controle de Versões</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nova Versão
        </button>
      </div>
      
      <VersaoList 
        versoes={versoes} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onToggleConcluido={toggleConcluido}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <VersaoForm 
              initialData={editingVersao || undefined}
              onSave={handleSave}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingVersao(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VersoesPage;