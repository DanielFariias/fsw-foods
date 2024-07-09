import { formatCurrency } from '@/helpers/price'
import { Restaurant } from '@prisma/client'
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface IRestaurantItemProps {
  restaurant: Restaurant
  className?: string
}
export function RestaurantItem({
  restaurant,
  className,
}: IRestaurantItemProps) {
  return (
    <Link
      className={cn('min-w-[266px] max-w-[266px] space-y-3', className)}
      href={`/restaurant/${restaurant.id}`}
    >
      <div className="relative h-[126px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover"
        />

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>

        <Button
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-600"
          size="icon"
        >
          <HeartIcon className="h-fit w-fit fill-white" size={14} />
        </Button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>

        <div className="flex gap-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <BikeIcon className="text-primary" size={14} />
            {Number(restaurant.deliveryFee) === 0
              ? 'Entrega grátis'
              : formatCurrency(Number(restaurant.deliveryFee))}
          </span>

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <TimerIcon className="text-primary" size={14} />
            {restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>
    </Link>
  )
}
