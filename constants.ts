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
    image: '/image/seven-hanging-valleys-guided-hiking-tour-from-albufeira-toppage.jpg',
    heroImage: '/image/seven-hanging-valleys-guided-hiking-tour-from-albufeira-toppage.jpg',
    highlights: [
      { text: 'Alfanzina Lighthouse vistas', text_pt: 'Vistas do Farol de Alfanzina', image: '/image/seven-hanging-valleys-guided-hiking-tour-from-albufeira-highlight1.jpeg' },
      { text: 'Carvalho Beach ancient tunnel', text_pt: 'Túnel antigo da Praia do Carvalho', image: 'https://images.unsplash.com/photo-1541542106277-51633d824d6d?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Marinha Beach rock formations', text_pt: 'Formações rochosas da Praia da Marinha', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae55?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Ocean-side cliff path adventure', text_pt: 'Aventura em trilhos de falésia à beira-mar', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1000' }
    ],
    itinerary: [
      { title: "McDonald's", title_pt: "McDonald's", desc: "Alternatively, the operator can also pick you up", desc_pt: "Em alternativa, o operador também pode ir buscá-lo" },
      { title: "Alfanzina Lighthouse", title_pt: "Farol de Alfanzina", desc: "", desc_pt: "" },
      { title: "Carvalho Beach", title_pt: "Carvalho Beach", desc: "", desc_pt: "" },
      { title: "Algar de Benagil", title_pt: "Algar de Benagil", desc: "", desc_pt: "" },
      { title: "Marinha Beach", title_pt: "Praia da Marinha", desc: "", desc_pt: "" },
      { title: "Return to starting point", title_pt: "Vai regressar ao ponto de partida", desc: "You will return to the starting point.", desc_pt: "Vai regressar ao ponto de partida" }
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
    description: 'Embark on a thrilling horseback ride while enjoying magnificent panoramic views over the lagoon with an experienced local guide. If you have no experience, no problem, as our guide will show you how to do it. For the more experienced, there will be the opportunity to ride along, subject to the instructors\' assessment of safety.\n\nThis horse ride is also a great opportunity to observe the region\'s flora. Discover the sensation of manoeuvring a horse with magnificent, relaxing views. Both experienced riders and beginners can take part in this 1h30 ride. Pick up included if necessary.',
    description_pt: 'Embarque num passeio a cavalo emocionante desfrutando de paisagens deslumbrantes, animais selvagens e vistas de tirar o fôlego da lagoa.',
    image: '/image/from-albufeira-horse-riding-tour-with-pickup-toppage.jpg',
    highlights: [
      { text: 'Lagoon panoramic views', text_pt: 'Vistas panorâmicas da lagoa', image: '/image/from-albufeira-horse-riding-tour-with-pickup-highlight1.jpg' },
      { text: 'Spot wild animals in nature', text_pt: 'Avistamento de animais selvagens na natureza', image: '/image/from-albufeira-horse-riding-tour-with-pickup-highlight2.jpg' },
      { text: 'Professional pickup service', text_pt: 'Serviço de recolha profissional', image: '/image/from-albufeira-horse-riding-tour-with-pickup-highlight3.jpg' }
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
    image: '/image/albufeira-hidden-gems-&-horse-riding-tour-toppage-2.jpg',
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
    description: 'Leave Albufeira on a trip to some of the most popular sights in the region on this half-day guided tour. Explore the natural pools and rock formations of Algar Seco, gaze at panoramic views of the Benagil Cave, and hike along the Seven Hanging Valleys trail before enjoying Marinha Beach.',
    description_pt: 'Saia de Albufeira em uma viagem para alguns dos pontos turísticos mais populares da região nesta excursão guiada de meio dia. Explore as piscinas naturais e formações rochosas do Algar Seco, preste atenção a vistas panorâmicas da Cave Benagil e percorra o Sentido dos Sete Vales Colocados antes de desfrutar da Praia da Marinha.',
    image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-toppage.jpg',
    highlights: [
      { text: 'Witness views of Benagil Cave', text_pt: 'Testemunhe vistas da Gruta de Benagil', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-5.jpeg' },
      { text: 'Discover Algar Seco natural pools', text_pt: 'Descubra as piscinas naturais do Algar Seco', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-2.jpeg' },
      { text: 'Thrill of cliff jumping', text_pt: 'Emoção de saltos de falésia', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-1.jpeg' },
      { text: 'Visit Marinha Beach secrets', text_pt: 'Visite os segredos da Praia da Marinha', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-3.jpeg' },
      { text: 'Explore Seven Hanging Valleys', text_pt: 'Explore os Sete Vales Suspensos', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-4.jpeg' }
    ],
    itinerary: [
      { title: "Benagil", title_pt: "Benagil", stopTime: "60 minutes", stopTime_pt: "60 minutos", desc: "At a time when it is not legally permitted to step on the sand of the Benagil Cave, we will still visit it from above, where you can witness a stunning panoramic view that will send shivers down your spine of the most famous cave in Portugal.", desc_pt: "Numa altura em que não é legalmente permitido pisar as areias da Gruta de Benagil, ainda a visitaremos do alto, onde poderá presenciar uma vista panorâmica deslumbrante que lhe fará arrepiar a espinha da gruta mais famosa de Portugal." },
      { title: "A Boneca", title_pt: "A Boneca", stopTime: "30 minutes", stopTime_pt: "30 minutos", desc: "Here, you will have the opportunity to explore the renowned Algar Seco, known for its stunning natural pools, caves, and the iconic 'Window to the Sea' rock formation. For the more adventurous, there is also an optional opportunity to experience cliff jumping at Algar Seco. Dive into the adventure!", desc_pt: "Aqui, você terá a oportunidade de explorar o renomado Algar Seco, conhecido por suas deslumbrantes piscinas naturais, cavernas e pela icônica formação rochosa 'Janela para o Mar'. Para os mais aventureiros, há também a oportunidade opcional de experimentar o salto de penhascos no Algar Seco. Mergulhe na aventura!" },
      { title: "Algar Seco", title_pt: "Algar Seco", stopTime: "30 minutes", stopTime_pt: "30 minutos", desc: "Here, you will have the opportunity to explore the renowned Algar Seco, known for its stunning natural pools, caves, and the iconic 'Window to the Sea' rock formation. For the more adventurous, there is also an optional opportunity to experience cliff jumping at Algar Seco. Dive into the adventure!", desc_pt: "Aqui, você terá a oportunidade de explorar o renomado Algar Seco, conhecido por suas deslumbrantes piscinas naturais, cavernas e pela icônica formação rochosa 'Janela para o Mar'. Para os mais aventureiros, há também a oportunidade opcional de experimentar o salto de penhascos no Algar Seco. Mergulhe na aventura!" },
      { title: "Seven Hanging Valleys Trail", title_pt: "Percurso dos Sete Vales Suspensos", stopTime: "60 minutes", stopTime_pt: "60 minutos", desc: "At the Marinha Beach stop, participants will have the opportunity to choose what they want to do: stroll along the seven hanging valleys, dive into unknown beaches, or lay out their towel on Marinha Beach.", desc_pt: "Na paragem na Praia da Marinha, os participantes terão a oportunidade de escolher o que querem fazer: passear nos sete vales suspensos, mergulhar em praias desconhecidas ou estender a toalha na Praia da Marinha." },
      { title: "Marinha Beach", title_pt: "Praia da Marinha", stopTime: "60 minutes", stopTime_pt: "60 minutos", desc: "Our adventure continues to Marinha Beach, acclaimed by CNN as one of the best in the world. Among endless cliffs and rock formations, we will unravel mysteries. For the boldest, there is a small section of the Seven Hanging Valleys trail to conquer. This is the ideal stop whether you seek adventure on the trail, relaxation on the beach, savoring endless views, or capturing photographic memories from the magnificent viewpoints. To finish, you will be treated to a spectacular sunset.", desc_pt: "A nossa aventura continua até à Praia da Marinha, aclamada pela CNN como uma das melhores do mundo. Entre infindáveis falésias e formações rochosas, desvendaremos mistérios. Para os mais ousados, há um pequeno trecho da trilha dos Sete Vales Suspensos para conquistar. Esta é a paragem ideal, quer procure aventura no trilho, relaxamento na praia, saboreando as vistas infinitas ou captando memórias fotográficas dos magníficos miradouros. Para finalizar, você será presenteado com um pôr do sol espetacular." },
      { title: "Return to starting point", title_pt: "Vai regressar ao ponto de partida", desc: "You will return to the starting point.", desc_pt: "Vai regressar ao ponto de partida." }
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