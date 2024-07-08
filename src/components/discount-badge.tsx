import { ArrowDownIcon } from 'lucide-react'

interface IDiscountBadgeProps {
  discountPercentage: number
}

export function DiscountBadge({ discountPercentage }: IDiscountBadgeProps) {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDownIcon size={12} strokeWidth={2.5} />
      <span className="text-xs font-semibold">{discountPercentage}%</span>
    </div>
  )
}
