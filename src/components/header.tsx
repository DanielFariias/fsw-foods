import Image from 'next/image'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Image src={'/logo.svg'} height={30} width={100} alt="logo" />

      <Button
        size={'icon'}
        variant={'outline'}
        className="border-none bg-transparent hover:bg-primary hover:text-white"
      >
        <MenuIcon />
      </Button>
    </header>
  )
}
