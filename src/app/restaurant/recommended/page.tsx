import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/resaturant-item'
import { db } from '@/lib/prisma'

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
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
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
