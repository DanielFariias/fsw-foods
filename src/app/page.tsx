import { CategoryList } from '@/components/category-list'
import { Header } from '@/components/header'
import { Search } from '@/components/search'
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
    </main>
  )
}
