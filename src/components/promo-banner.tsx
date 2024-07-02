import Image from 'next/image'
import React, { ComponentProps } from 'react'

type PromoBannerProps = ComponentProps<typeof Image>

export function PromoBanner(props: PromoBannerProps) {
  const { alt, src, ...restProps } = props
  const altProp = alt || 'hero'
  const srcProp = src || '/promo-banner.png'

  return (
    <Image
      width={0}
      height={0}
      className="h-auto w-full object-contain px-5 pt-6"
      sizes="100vw"
      alt={altProp}
      src={srcProp}
      quality={100}
      {...restProps}
    />
  )
}
