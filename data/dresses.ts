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
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marina1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marina2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marina1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marina2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marina3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marina4.jpg']
  },
  { 
    name: 'Mirabelle', slug: 'mirabelle', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Mirabelle1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Mirabelle2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Mirabelle1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Mirabelle2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Mirabelle3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Mirabelle4.jpg']
  },
  { 
    name: 'Elore', slug: 'elore', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Elore1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Elore2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Elore1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Elore2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Elore3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Elore4.jpg']
  },
  { 
    name: 'Liora', slug: 'liora', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liora1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liora2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liora1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liora2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liora3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liora4.jpg']
  },
  { 
    name: 'Stella', slug: 'stella', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Stella1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Stella2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Stella1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Stella2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Stella3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Stella4.jpg']
  },
  { 
    name: 'Penelope', slug: 'penelope', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Penelope1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Penelope2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Penelope1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Penelope2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Penelope3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Penelope4.jpg']
  },
  { 
    name: 'Gabrielle', slug: 'gabrielle', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Gabrielle1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Gabrielle2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Gabrielle1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Gabrielle2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Gabrielle3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Gabrielle4.jpg']
  },
  { 
    name: 'Rosie', slug: 'rosie', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rosie1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rosie2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rosie1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rosie2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rosie3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rosie4.jpg']
  },
  { 
    name: 'Ania', slug: 'ania', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ania1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ania2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ania1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ania2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ania3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ania4.jpg']
  },
  { 
    name: 'Brielle', slug: 'brielle', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Brielle1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Brielle2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Brielle1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Brielle2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Brielle3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Brielle4.jpg']
  },
]