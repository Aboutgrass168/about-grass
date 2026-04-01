import { CollectionSlug, GlobalSlug } from 'payload'
import {
  User,
  ImageIcon,
  FileTextIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  TagIcon,
  WrenchIcon,
  HomeIcon,
  FootprintsIcon,
  MailIcon,
  LayoutIcon,
  GlobeIcon,
} from 'lucide-react'
import { ExoticComponent } from 'react'

// Import the LucideProps type from lucide-react
import type { LucideProps } from 'lucide-react'

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  users: User,
  media: ImageIcon,
  products: ShoppingBagIcon,
  'product-categories': TagIcon,
  service: WrenchIcon,
  'blog-and-news': NewspaperIcon,
  'blog-news-categories': FileTextIcon,

  // Globals
  homePage: HomeIcon,
  header: LayoutIcon,
  footer: FootprintsIcon,
  contact: MailIcon,
  aboutus: FileTextIcon,
  ourproduct: ShoppingBagIcon,
  'golf-center': GlobeIcon,
}

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined
