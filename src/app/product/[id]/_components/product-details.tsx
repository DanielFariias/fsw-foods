'use client'

import { DiscountBadge } from '@/components/discount-badge'
import { ProductList } from '@/components/product-list'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { calculateProductTotalPrice, formatCurrency } from '@/helpers/price'
import { Prisma } from '@prisma/client'
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface IProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

export function ProductDetails({
  product,
  complementaryProducts,
}: IProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  function handleIncreaseQuantity() {
    setQuantity((prevState) => prevState + 1)
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1)
    }
  }

  return (
    <>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <Image
              className="rounded-full object-cover"
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div className="text-xl font-semibold">
            <div>
              <div className="flex items-center gap-2">
                <h2>{formatCurrency(calculateProductTotalPrice(product))}</h2>
                {product.discountPercentage > 0 && (
                  <DiscountBadge
                    discountPercentage={product.discountPercentage}
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="border border-muted-foreground hover:bg-primary hover:text-white"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              variant={'ghost'}
              size={'icon'}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-6 text-center">
              {String(quantity).padStart(2, '0')}
            </span>
            <Button
              className="border border-muted-foreground hover:bg-primary hover:text-white"
              onClick={handleIncreaseQuantity}
              variant={'ghost'}
              size={'icon'}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <Card className="mt-6 flex justify-around rounded-sm py-4">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryTimeMinutes) > 0 ? (
              <p className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes} min
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </>
  )
}
