'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface IProductImageProps {
  product: Pick<Product, 'imageUrl' | 'name'>
}

export function ProductImage({ product }: IProductImageProps) {
  const router = useRouter()

  return (
    <div className="relative h-[360px] w-full">
      <Image
        className="object-cover"
        src={product.imageUrl}
        alt={product.name}
        fill
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        onClick={() => router.back()}
        size={'icon'}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  )
}
