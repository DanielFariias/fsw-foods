import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProductImage } from './_components/product-image'
import { ProductDetails } from './_components/product-details'

interface IProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: IProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      restaurant: true,
    },
  })

  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  })

  if (!product) return notFound()

  return (
    <div>
      <ProductImage product={product} />

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  )
}
