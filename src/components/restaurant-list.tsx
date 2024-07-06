import { db } from '@/lib/prisma'
import { RestaurantItem } from './resaturant-item'

export async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({
    take: 10,
  })

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}
