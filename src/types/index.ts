export interface Chamado {
    id: number;
    numero: string;
    empresa: string;
    assunto: string;
    estado: 'responder' | 'respondido' | 'a cobrar';
    dataResposta?: Date;
  }
  
  export interface Versao {
    id: number;
    sistema: string;
    fornecedor: 'CRK' | 'Autbank' | 'Função' | 'Advice' | 'EasyWay' | 'JD' | string;
    versaoAtual: string;
    versaoAtualizar: string;
    concluido: boolean;
    ambiente: 'homologação' | 'produção';
    observacoes: string;
    dataAtualizacao?: Date;
  }
  
  