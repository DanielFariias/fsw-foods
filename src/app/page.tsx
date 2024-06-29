import { CategoryList } from '@/components/category-list'
import { Header } from '@/components/header'
import { Search } from '@/components/search'

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
    </main>
  )
}
