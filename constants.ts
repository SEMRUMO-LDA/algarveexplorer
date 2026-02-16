import { Tour, TransferService } from './types';

export const TOURS: Tour[] = [
  {
    id: '6',
    title: 'Seven Hanging Valleys Guided Hiking Tour from Albufeira',
    slug: 'seven-hanging-valleys-hiking-albufeira',
    duration: '4-4.5 HOURS',
    difficulty: 'Moderate',
    price: 45,
    maxGroupSize: 21,
    ageRange: '6-65',
    description: 'Explore the scenic Seven Hanging Valleys trail on a guided hike. Discover stunning landscapes, majestic cliffs, and the hidden Carvalho beach tunnel.',
    image: '/image/seven-anging-valleys-guided-hiking-tour-from-albufeira.jpg',
    highlights: [
      { text: 'Alfanzina Lighthouse vistas', image: '/image/seven-anging-valleys-guided-hiking-tour-from-albufeira.jpg' },
      { text: 'Carvalho Beach ancient tunnel', image: 'https://images.unsplash.com/photo-1541542106277-51633d824d6d?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Marinha Beach rock formations', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Ocean-side cliff path adventure', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1000' }
    ]
  },
  {
    id: '7',
    title: 'From Albufeira: Horse Riding Tour with Pickup',
    slug: 'horse-riding-tour-albufeira-pickup',
    duration: '1.5 HOURS',
    difficulty: 'Easy',
    price: 65,
    maxGroupSize: 21,
    ageRange: '6-65',
    description: 'Embark on a thrilling horseback ride enjoying stunning landscapes, wild animals and breathtaking views of the lagoon.',
    image: '/image/from-albufeira-horse-riding-tour-with-pickup.jpg',
    highlights: [
      { text: 'Lagoon panoramic views', image: '/image/from-albufeira-horse-riding-tour-with-pickup.jpg' },
      { text: 'Spot wild animals in nature', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Professional pickup service', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000' }
    ]
  },
  {
    id: '4',
    title: 'Albufeira Hidden Gems & Horse Riding Tour',
    slug: 'albufeira-hidden-gems-horse-riding',
    duration: '4 HOURS',
    difficulty: 'Easy',
    price: 80,
    maxGroupSize: 21,
    ageRange: '6-65',
    description: 'Discover coastal secrets and hidden pearl beaches on horseback.',
    image: '/image/albufeira-hidden-gems-&-horse-riding-tour.jpg',
    highlights: [
      { text: 'Hidden pearl beaches', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Exciting horseback ride', image: '/image/albufeira-hidden-gems-&-horse-riding-tour.jpg' },
      { text: 'Magnificent panoramic views', image: 'https://images.unsplash.com/photo-1551632432-c7360b7f0187?auto=format&fit=crop&q=80&w=1000' },
      { text: 'Spot endangered species', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000' }
    ]
  },
  {
    id: '5',
    title: 'Benagil, Algar Seco, Marinha & 7 Valleys Tour',
    slug: 'benagil-marinha-7-valleys-tour',
    duration: '5 HOURS',
    difficulty: 'Moderate',
    price: 45,
    maxGroupSize: 21,
    ageRange: '6-65',
    description: 'Explore stunning caves, the 7 Hanging Valleys and swim in crystal-clear waters.',
    image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour.jpg',
    highlights: [
      { text: 'Witness views of Benagil Cave', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-5.jpeg' },
      { text: 'Discover Algar Seco natural pools', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-2.jpeg' },
      { text: 'Thrill of cliff jumping', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-1.jpeg' },
      { text: 'Visit Marinha Beach secrets', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-3.jpeg' },
      { text: 'Explore Seven Hanging Valleys', image: '/image/benagil-algar-seco-marinha-&-7-valleys-tour-4.jpeg' }
    ]
  }
];

export const TRANSFERS: TransferService[] = [
  {
    id: 't1',
    route: 'Faro Airport to Albufeira',
    price: 45,
    capacity: '1-4 Persons + Equipment',
    description: 'Quick door-to-door transfer with ample space for hiking gear.'
  },
  {
    id: 't2',
    route: 'Faro Airport to Lagos/Sagres',
    price: 95,
    capacity: '1-8 Persons + Equipment',
    description: 'Group shuttle service for trail expeditions and coastal walkers.'
  }
];