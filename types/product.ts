export type Category =
  | 'Electronics'
  | 'Books'
  | 'Clothing'
  | 'Home & Kitchen'
  | 'Sports'

export type ProductStatus = 'idle' | 'saving' | 'error'
export interface Product {
  id: number
  title: string
  price: number     // float, 2 decimal places
  category: Category
  rating: number    // 1.0 – 5.0
}

export interface RuntimeProduct extends Product {
  _status: ProductStatus
  _optimisticCategory: Category | null
  _lockedByUser: boolean
  _error: string | null
}
export interface UpdateCategoryResponse {
  id: number
  category: Category
  updatedAt: string  // ISO 8601
}

export interface LiveProductUpdate {
  id: number
  price: number
  rating: number
}