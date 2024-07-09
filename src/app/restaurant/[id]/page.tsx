import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { RestaurantImage } from './_components/restaurant-image'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import { DeliveryInfo } from '@/components/delivery-info'
import { ProductList } from '@/components/product-list'

interface IRestaurantPageProps {
  params: {
    id: string
  }
}

export default async function RestaurantPage({ params }: IRestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: params.id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            where: {
              restaurantId: params.id,
            },
            include: {
              restaurant: true,
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!restaurant) return notFound()

  return (
    <>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-full bg-white px-5 pt-5">
        <div className="flex items-center gap-1">
          <div className="relative h-8 w-8">
            <Image
              className="rounded-full object-cover"
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="left-2 top-2 flex items-center gap-[2px] rounded-full bg-foreground bg-white px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[200px] rounded-lg bg-[#f4f4f4] px-6 py-1 text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      <div className="pb-6">
        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="px-5 font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}
      </div>
    </>
  )
}
