import { CategoryList } from '@/components/category-list'
import { Header } from '@/components/header'
import { ProductList } from '@/components/product-list'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
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
        <Image
          src="/promo-banner.png"
          alt="hero"
          width={0}
          height={0}
          className="h-auto w-full object-contain px-5 pt-6"
          sizes="100vw"
          quality={100}
        />
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
        <ProductList />
      </div>
    </main>
  )
}
