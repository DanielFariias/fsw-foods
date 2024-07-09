'use client'

import { Button } from '@/components/ui/button'
import { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface IRestaurantImageProps {
  restaurant: Pick<Restaurant, 'imageUrl' | 'name'>
}

export function RestaurantImage({ restaurant }: IRestaurantImageProps) {
  const router = useRouter()

  return (
    <div className="relative h-[250px] w-full">
      <Image
        className="object-cover"
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        onClick={() => router.back()}
        size={'icon'}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        className="absolute right-4 top-4 rounded-full bg-gray-600"
        size="icon"
      >
        <HeartIcon className="h-fit w-fit fill-white" size={20} />
      </Button>
    </div>
  )
}
