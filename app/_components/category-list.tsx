import { db } from '../_lib/prisma'
import CategoryItem from './category-item'

const CategoryList = async () => {
  const categories = await db.category.findMany({})

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 pb-2 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryList
