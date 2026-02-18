import { Tour, TransferService } from './types';

export const TOURS: Tour[] = [
  {
    id: '6',
    title: 'Seven Hanging Valleys Guided Hiking Tour from Albufeira',
    title_pt: 'Tour de Caminhada Guiada pelos Sete Vales Suspensos desde Albufeira',
    slug: 'seven-hanging-valleys-hiking-albufeira',
    duration: '4-4.5 HOURS',
    duration_pt: '4-4.5 HORAS',
    difficulty: 'Moderate',
    difficulty_pt: 'Moderado',
    price: 45,
    maxGroupSize: 21,
    ageRange: '6-65',
    ageRange_pt: '6-65 anos',
    description: 'Explore the scenic Seven Hanging Valleys trail on a guided hike. Discover stunning landscapes, majestic cliffs, and the hidden Carvalho beach tunnel.',
    description_pt: 'Explore o cénico trilho dos Sete Vales Suspensos numa caminhada guiada. Descubra paisagens deslumbrantes, falésias majestosas e o túnel escondido da praia do Carvalho.',
    image: '/image/seven-anging-valleys-guided-hiking-tour-from-albufeira.jpg',
    highlights: [
      { text: 'Alfanzina Lighthouse vistas', text_pt: 'Vistas do Farol de Alfanzina', image: '/image/seven-anging-valleys-guided-hiking-tour-from-albufeira.jpg' },
      { text: 'Carvalho Beach ancient tunnel', text_pt: 'Túnel antigo da Praia do Carvalho', image: 'https://images.unsplash.com/photo-1541542106277-51633d824d6d?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Marinha Beach rock formations', text_pt: 'Formações rochosas da Praia da Marinha', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae55?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Ocean-side cliff path adventure', text_pt: 'Aventura em trilhos de falésia à beira-mar', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1000' }
    ]
  },
  {
    id: '7',
    title: 'From Albufeira: Horse Riding Tour with Pickup',
    title_pt: 'De Albufeira: Passeio a Cavalo com Recolha',
    slug: 'horse-riding-tour-albufeira-pickup',
    duration: '1.5 HOURS',
    duration_pt: '1.5 HORAS',
    difficulty: 'Easy',
    difficulty_pt: 'Fácil',
    price: 65,
    maxGroupSize: 21,
    ageRange: '6-65',
    ageRange_pt: '6-65 anos',
    description: 'Embark on a thrilling horseback ride enjoying stunning landscapes, wild animals and breathtaking views of the lagoon.',
    description_pt: 'Embarque num passeio a cavalo emocionante desfrutando de paisagens deslumbrantes, animais selvagens e vistas de tirar o fôlego da lagoa.',
    image: '/image/from-albufeira-horse-riding-tour-with-pickup.jpg',
    highlights: [
      { text: 'Lagoon panoramic views', text_pt: 'Vistas panorâmicas da lagoa', image: '/image/from-albufeira-horse-riding-tour-with-pickup.jpg' },
      { text: 'Spot wild animals in nature', text_pt: 'Avistamento de animais selvagens na natureza', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Professional pickup service', text_pt: 'Serviço de recolha profissional', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000' }
    ]
  },
  {
    id: '4',
    title: 'Albufeira Hidden Gems & Horse Riding Tour',
    title_pt: 'Joias Escondidas de Albufeira e Passeio a Cavalo',
    slug: 'albufeira-hidden-gems-horse-riding',
    duration: '4 HOURS',
    duration_pt: '4 HORAS',
    difficulty: 'Easy',
    difficulty_pt: 'Fácil',
    price: 80,
    maxGroupSize: 21,
    ageRange: '6-65',
    ageRange_pt: '6-65 anos',
    description: 'Discover coastal secrets and hidden pearl beaches on horseback.',
    description_pt: 'Descubra segredos costeiros e praias pérolas escondidas a cavalo.',
    image: '/image/albufeira-hidden-gems-&-horse-riding-tour.jpg',
    highlights: [
      { text: 'Hidden pearl beaches', text_pt: 'Praias pérolas escondidas', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Exciting horseback ride', text_pt: 'Passeio a cavalo emocionante', image: '/image/albufeira-hidden-gems-&-horse-riding-tour.jpg' },
      { text: 'Magnificent panoramic views', text_pt: 'Vistas panorâmicas magníficas', image: 'https://images.unsplash.com/photo-1551632432-c7360b7f0187?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Spot endangered species', text_pt: 'Avistamento de espécies em perigo', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000' }
    ]
  },
  {
    id: '5',
    title: 'Benagil, Algar Seco, Marinha & 7 Valleys Tour',
    title_pt: 'Tour Benagil, Algar Seco, Marinha & 7 Vales',
    slug: 'benagil-marinha-7-valleys-tour',
    duration: '5 HOURS',
    duration_pt: '5 HORAS',
    difficulty: 'Moderate',
    difficulty_pt: 'Moderado',
    price: 45,
    maxGroupSize: 21,
    ageRange: '6-65',
    ageRange_pt: '6-65 anos',
    description: 'Explore stunning caves, the 7 Hanging Valleys and swim in crystal-clear waters.',
    description_pt: 'Explore grutas deslumbrantes, os 7 Vales Suspensos e nade em águas cristalinas.',
    image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour.jpg',
    highlights: [
      { text: 'Witness views of Benagil Cave', text_pt: 'Testemunhe vistas da Gruta de Benagil', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-5.jpeg' },
      { text: 'Discover Algar Seco natural pools', text_pt: 'Descubra as piscinas naturais do Algar Seco', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-2.jpeg' },
      { text: 'Thrill of cliff jumping', text_pt: 'Emoção de saltos de falésia', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-1.jpeg' },
      { text: 'Visit Marinha Beach secrets', text_pt: 'Visite os segredos da Praia da Marinha', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-3.jpeg' },
      { text: 'Explore Seven Hanging Valleys', text_pt: 'Explore os Sete Vales Suspensos', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-4.jpeg' }
    ]
  }
];

export const TRANSFERS: TransferService[] = [
  {
    id: 't1',
    route: 'Faro Airport to Albufeira',
    route_pt: 'Aeroporto de Faro para Albufeira',
    price: 45,
    capacity: '1-4 Persons + Equipment',
    capacity_pt: '1-4 Pessoas + Equipamento',
    description: 'Quick door-to-door transfer with ample space for hiking gear.',
    description_pt: 'Transfer rápido porta-a-ponta com amplo espaço para equipamento de caminhada.'
  },
  {
    id: 't2',
    route: 'Faro Airport to Lagos/Sagres',
    route_pt: 'Aeroporto de Faro para Lagos/Sagres',
    price: 95,
    capacity: '1-8 Persons + Equipment',
    capacity_pt: '1-8 Pessoas + Equipamento',
    description: 'Group shuttle service for trail expeditions and coastal walkers.',
    description_pt: 'Serviço de shuttle para grupos para expedições em trilhos e caminhadas costeiras.'
  }
];