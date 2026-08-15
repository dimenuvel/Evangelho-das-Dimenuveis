export interface DimenuvelSound {
  id: number;
  numberStr: string;
  name: string;
  frequency: number; // Hz
  description: string;
}

export const DIMENUVEIS_SOUNDS: DimenuvelSound[] = [
  {
    id: 1,
    numberStr: '01',
    name: 'Silêncio',
    frequency: 64,
    description: 'Quietude fundamental e presença sem ruído.'
  },
  {
    id: 2,
    numberStr: '02',
    name: 'Visão',
    frequency: 144,
    description: 'Clareza perceptiva e testemunho livre de projeções.'
  },
  {
    id: 3,
    numberStr: '03',
    name: 'Mente',
    frequency: 216,
    description: 'Discernimento sereno e ordenação dos pensamentos.'
  },
  {
    id: 4,
    numberStr: '04',
    name: 'Coração',
    frequency: 136.1,
    description: 'Ressonância compassiva, tom primordial de equilíbrio.'
  },
  {
    id: 5,
    numberStr: '05',
    name: 'Vontade',
    frequency: 256,
    description: 'Intenção firme, direção clara e centro de gravidade.'
  },
  {
    id: 6,
    numberStr: '06',
    name: 'Energia',
    frequency: 320,
    description: 'Vitalidade sutil, expansão e fluxo contínuo.'
  },
  {
    id: 7,
    numberStr: '07',
    name: 'Matéria',
    frequency: 72,
    description: 'Ancoramento, presença no corpo e estabilidade terrena.'
  }
];
