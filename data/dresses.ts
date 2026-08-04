export interface DressPreview {
  name: string
  slug: string
  category?: string // Made optional
  image: string
  hoverImage: string
  gallery?: string[] // Optional extra shots for the H&M-style view
}

export const DRESSES: DressPreview[] = [
    { 
    name: 'Marina', slug: 'marina', 
    image: '/collections/Marina1.jpg', hoverImage: '/collections/Marina2.jpg',
    gallery: ['/collections/Marina1.jpg', '/collections/Marina2.jpg', '/collections/Marina3.jpg', '/collections/Marina4.jpg']
  },
  { 
    name: 'Mirabelle', slug: 'mirabelle', 
    image: '/collections/Mirabelle1.jpg', hoverImage: '/collections/Mirabelle2.jpg',
    gallery: ['/collections/Mirabelle1.jpg', '/collections/Mirabelle2.jpg', '/collections/Mirabelle3.jpg', '/collections/Mirabelle4.jpg']
  },
  { 
    name: 'Elore', slug: 'elore', 
    image: '/collections/Elore1.jpg', hoverImage: '/collections/Elore2.jpg',
    gallery: ['/collections/Elore1.jpg', '/collections/Elore2.jpg', '/collections/Elore3.jpg', '/collections/Elore4.jpg']
  },
  { 
    name: 'Liora', slug: 'liora', 
    image: '/collections/Liora1.jpg', hoverImage: '/collections/Liora2.jpg',
    gallery: ['/collections/Liora1.jpg', '/collections/Liora2.jpg', '/collections/Liora3.jpg', '/collections/Liora4.jpg']
  },
  { 
    name: 'Stella', slug: 'stella', 
    image: '/collections/Stella1.jpg', hoverImage: '/collections/Stella2.jpg',
    gallery: ['/collections/Stella1.jpg', '/collections/Stella2.jpg', '/collections/Stella3.jpg', '/collections/Stella4.jpg']
  },
  { 
    name: 'Penelope', slug: 'penelope', 
    image: '/collections/Penelope1.jpg', hoverImage: '/collections/Penelope2.jpg',
    gallery: ['/collections/Penelope1.jpg', '/collections/Penelope2.jpg', '/collections/Penelope3.jpg', '/collections/Penelope4.jpg']
  },
  { 
    name: 'Gabrielle', slug: 'gabrielle', 
    image: '/collections/Gabrielle1.jpg', hoverImage: '/collections/Gabrielle2.jpg',
    gallery: ['/collections/Gabrielle1.jpg', '/collections/Gabrielle2.jpg', '/collections/Gabrielle3.jpg', '/collections/Gabrielle4.jpg']
  },
  { 
    name: 'Rosie', slug: 'rosie', 
    image: '/collections/Rosie1.jpg', hoverImage: '/collections/Rosie2.jpg',
    gallery: ['/collections/Rosie1.jpg', '/collections/Rosie2.jpg', '/collections/Rosie3.jpg', '/collections/Rosie4.jpg']
  },
  { 
    name: 'Ania', slug: 'ania', 
    image: '/collections/Ania1.jpg', hoverImage: '/collections/Ania2.jpg',
    gallery: ['/collections/Ania1.jpg', '/collections/Ania2.jpg', '/collections/Ania3.jpg', '/collections/Ania4.jpg']
  },
]