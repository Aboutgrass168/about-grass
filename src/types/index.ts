/* eslint-disable @typescript-eslint/no-explicit-any */
import { Media, ProductCategory } from '../payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

// Category Types
export interface Category {
  id: string | number
  name: string
  slug: string
  icon?: string | { url: string }
  where?: any
}

// Product Types
export interface Product {
  id: string | number
  name: string
  slug: string
  skuCode: string
  imageList: {
    image: number | Media
    id?: string | null
  }[]
  categories: (number | ProductCategory)[]
  createdAt?: string
}

// Component Props Types
export interface CategorySidebarProps {
  categories: Category[]
  initialCategorySlug?: string
}

export interface ProductGridProps {
  productsData: {
    docs: Product[]
    totalPages: number
    totalDocs: number
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
  }
  categories: Category[]
  currentPage: number
  currentCategory: string
  currentSort: string
}

export interface ProductCardProps {
  id: string | number
  name: string
  slug: string
  skuCode: string
  category: any
  imageList: any[]
}

// Block Types
export interface BannerBlock {
  style: 'info' | 'warning' | 'error' | 'success'
  content: any // Rich text content
}

export interface MediaBlock {
  media: Media | number
  caption?: SerializedEditorState
}
