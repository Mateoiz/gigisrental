export interface DressPreview {
  name: string
  slug: string
  category: string
  image: string
  hoverImage: string
}

export const DRESSES: DressPreview[] = [
  { name: 'Lisette', slug: 'lisette', category: 'Chantilly Lace Gown', image: '/collections/Lisette1.jpg', hoverImage: '/collections/Lisette2.jpg' },
  { name: 'Maccy', slug: 'maccy', category: 'Satin & Pearl Evening Wear', image: '/collections/Maccy1.jpg', hoverImage: '/collections/Maccy2.jpg' },
  { name: 'Solenne', slug: 'solenne', category: 'Modern Vietnamese (Áo Dài)', image: '/collections/Solenne1.jpg', hoverImage: '/collections/Solenne2.jpg' },
  { name: 'Delphine', slug: 'delphine', category: 'Custom Fitted Ball Gown', image: '/collections/Delphine1.jpg', hoverImage: '/collections/Delphine2.jpg' },
  { name: 'Lucienne', slug: 'lucienne', category: 'Chantilly Lace Gown', image: '/collections/Lucienne1.jpg', hoverImage: '/collections/Lucienne2.jpg' },
  { name: 'Penelope', slug: 'penelope', category: 'Satin & Pearl Evening Wear', image: '/collections/PenDress1.jpg', hoverImage: '/collections/PenDress2.jpg' },
  { name: 'Rosie', slug: 'rosie', category: 'Satin & Pearl Evening Wear', image: '/collections/Rosie1.jpg', hoverImage: '/collections/Rosie2.jpg' },
]