import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/resaturant-item'
import { db } from '@/lib/prisma'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function RecommendedPage() {
  const restaurants = await db.restaurant.findMany({
    take: 10,
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            take: 3,
            include: {
              restaurant: true,
            },
          },
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Restaurantes Recomendados</h2>

          <Link
            href={'/'}
            className="flex items-center text-sm font-medium text-primary hover:text-secondary-foreground"
          >
            <ChevronLeft size={16} />
            Voltar
          </Link>
        </div>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className={'min-w-full max-w-full'}
            />
          ))}
        </div>
      </div>
    </>
  )
}
