import { Product } from '@prisma/client'

export function calculateProductTotalPrice(product: Product) {
  const price = Number(product.price)

  if (product.discountPercentage === 0) {
    return price
  }

  const discount = price * (product.discountPercentage / 100)

  return price - discount
}

export function formatCurrency(price: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(price)
}
