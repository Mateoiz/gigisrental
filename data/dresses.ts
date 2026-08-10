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
{ 
    name: 'Maecy', slug: 'maecy', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Maecy1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Maecy2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Maecy1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Maecy2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Maecy3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Maecy4.jpg']
  },
  { 
    name: 'Alexa', slug: 'alexa', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Alexa1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Alexa2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Alexa1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Alexa2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Alexa3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Alexa4.jpg']
  },
  { 
    name: 'Liam', slug: 'liam', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liam1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liam2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liam1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liam2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liam3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Liam4.jpg']
  },
  { 
    name: 'Solenne', slug: 'solenne', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Solenne1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Solenne2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Solenne1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Solenne2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Solenne3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Solenne4.jpg']
  },
  { 
    name: 'Noelle', slug: 'noelle', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Noelle1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Noelle2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Noelle1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Noelle2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Noelle3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Noelle4.jpg']
  },
  { 
    name: 'Bianca', slug: 'bianca', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Bianca1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Bianca2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Bianca1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Bianca2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Bianca3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Bianca4.jpg']
  },
  { 
    name: 'Lisette', slug: 'lisette', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lisette1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lisette2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lisette1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lisette2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lisette3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lisette4.jpg']
  },
  { 
    name: 'Marceline', slug: 'marceline', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marceline1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marceline2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marceline1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marceline2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marceline3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Marceline4.jpg']
  },
  { 
    name: 'Asia', slug: 'asia', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Asia1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Asia2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Asia1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Asia2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Asia3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Asia4.jpg']
  },
  { 
    name: 'Estella', slug: 'estella', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Estella1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Estella2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Estella1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Estella2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Estella3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Estella4.jpg']
  },
  { 
    name: 'Veronica', slug: 'veronica', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Veronica1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Veronica2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Veronica1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Veronica2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Veronica3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Veronica4.jpg']
  },
  { 
    name: 'Rina', slug: 'rina', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rina1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rina2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rina1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rina2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rina3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Rina4.jpg']
  },
  { 
    name: 'Iris', slug: 'iris', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Iris1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Iris2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Iris1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Iris2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Iris3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Iris4.jpg']
  },
  { 
    name: 'Lucienne', slug: 'lucienne', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lucienne1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lucienne2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lucienne1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lucienne2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lucienne3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lucienne4.jpg']
  },
  { 
    name: 'Delphine', slug: 'delphine', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Delphine1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Delphine2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Delphine1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Delphine2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Delphine3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Delphine4.jpg']
  },
  { 
    name: 'Camille', slug: 'camille', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Camille1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Camille2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Camille1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Camille2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Camille3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Camille4.jpg']
  },
  { 
    name: 'Juliette', slug: 'juliette', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Juliette1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Juliette2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Juliette1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Juliette2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Juliette3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Juliette4.jpg']
  },
  { 
    name: 'Lilia', slug: 'lilia', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lilia1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lilia2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lilia1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lilia2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lilia3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Lilia4.jpg']
  },
  { 
    name: 'Eloise', slug: 'eloise', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eloise1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eloise2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eloise1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eloise2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eloise3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eloise4.jpg']
  },
  { 
    name: 'Madeleine', slug: 'madeleine', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Madeleine1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Madeleine2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Madeleine1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Madeleine2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Madeleine3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Madeleine4.jpg']
  },
  { 
    name: 'Natalia', slug: 'natalia', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Natalia1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Natalia2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Natalia1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Natalia2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Natalia3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Natalia4.jpg']
  },
  { 
    name: 'Eliana', slug: 'eliana', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eliana1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eliana2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eliana1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eliana2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eliana3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eliana4.jpg']
  },
  { 
    name: 'Selene', slug: 'selene', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Selene1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Selene2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Selene1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Selene2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Selene3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Selene4.jpg']
  },
  { 
    name: 'Ophelia', slug: 'ophelia', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ophelia1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ophelia2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ophelia1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ophelia2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ophelia3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Ophelia4.jpg']
  },
  { 
    name: 'Eveline', slug: 'eveline', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eveline1.jpg', hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eveline2.jpg',
    gallery: ['https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eveline1.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eveline2.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eveline3.jpg', 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Eveline4.jpg']
  },

{ 
    name: 'Adela', slug: 'adela', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Adela1.jpg?v=2', 
    hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Adela2.jpg?v=2',
    gallery: [
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Adela1.jpg?v=2', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Adela2.jpg?v=2', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Adela3.jpg?v=2', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Adela4.jpg?v=2'
    ]
  },
  { 
    name: 'Oceana', slug: 'oceana', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Oceana1.jpg', 
    hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Oceana2.jpg',
    gallery: [
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Oceana1.jpg', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Oceana2.jpg', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Oceana3.jpg', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Oceana4.jpg'
    ]
  },
  {
    name: 'Genevieve', slug: 'genevieve', 
    image: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Genevieve1.jpg', 
    hoverImage: 'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Genevieve2.jpg',
    gallery: [
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Genevieve1.jpg', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Genevieve2.jpg', 
      'https://pmrqoxlvmtaevrazsyww.supabase.co/storage/v1/object/public/collections/Genevieve3.jpg', 
    ]
  },
]