import { forwardRef, type ImgHTMLAttributes, useState, useEffect } from 'react'

const FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fit' | 'fill'
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, fittingType = 'fit', ...props }, ref) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)

  useEffect(() => {
    setImgSrc((prev) => {
      if (prev !== src) {
        return src
      }
      return prev
    })
  }, [src])

  if (!src) {
    return <div data-empty-image ref={ref} {...props} />
  }

  const imageProps = {
    ...props, 
    onError: () => setImgSrc(FALLBACK_IMAGE_URL),
    style: {
      objectFit: fittingType === 'fill' ? 'cover' : 'contain',
      ...props.style
    }
  }

  return <img data-error-image={imgSrc === FALLBACK_IMAGE_URL} ref={ref} src={imgSrc} {...imageProps} />
})
Image.displayName = 'Image'