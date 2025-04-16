import { Chamado, Versao } from '../types';

// Mock data para começar
const CHAMADOS_KEY = 'chamados_data';
const VERSOES_KEY = 'versoes_data';

// Função para verificar se a data passou da meia-noite e mudar o estado para "a cobrar"
const verificarChamadosACobrar = (chamados: Chamado[]): Chamado[] => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Meia-noite de hoje
  
  return chamados.map(chamado => {
    if (chamado.estado === 'respondido' && chamado.dataResposta) {
      const dataResposta = new Date(chamado.dataResposta);
      dataResposta.setHours(0, 0, 0, 0); // Meia-noite do dia da resposta
      
      if (hoje > dataResposta) {
        return { ...chamado, estado: 'a cobrar' };
      }
    }
    
    return chamado;
  });
};

// Funções para Chamados
export const getChamados = (): Chamado[] => {
  const storedData = localStorage.getItem(CHAMADOS_KEY);
  
  if (storedData) {
    const chamados = JSON.parse(storedData) as Chamado[];
    // Verifica se algum chamado respondido virou "a cobrar"
    const chamadosAtualizados = verificarChamadosACobrar(chamados);
    
    // Se houve alguma atualização, salvamos de volta
    if (JSON.stringify(chamados) !== JSON.stringify(chamadosAtualizados)) {
      saveChamados(chamadosAtualizados);
    }
    
    return chamadosAtualizados;
  }
  
  return [];
};

export const saveChamados = (chamados: Chamado[]): void => {
  localStorage.setItem(CHAMADOS_KEY, JSON.stringify(chamados));
};

// Funções para Versões
export const getVersoes = (): Versao[] => {
  const storedData = localStorage.getItem(VERSOES_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const saveVersoes = (versoes: Versao[]): void => {
  localStorage.setItem(VERSOES_KEY, JSON.stringify(versoes));
};