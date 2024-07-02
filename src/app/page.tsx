import { CategoryList } from '@/components/category-list'
import { Header } from '@/components/header'
import { ProductList } from '@/components/product-list'
import { PromoBanner } from '@/components/promo-banner'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/prisma'
import { ChevronRightIcon } from 'lucide-react'

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <main>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="">
        <PromoBanner src="/promo-banner.png" alt="hero" />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            className="h-fit p-0 text-primary hover:bg-transparent"
            variant={'ghost'}
          >
            ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="py-5 pt-6">
        <PromoBanner src="/promo-banner-02.png" alt="hero" />
      </div>
    </main>
  )
}
