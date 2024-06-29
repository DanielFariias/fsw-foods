import { Header } from '@/components/header'
import { Search } from '@/components/search'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
    </main>
  )
}
