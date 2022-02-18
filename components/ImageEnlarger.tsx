import { FC, ReactElement, useState } from 'react'

export interface ImageEnlargerProps {
  children: ReactElement
}

const ImageEnlarger: FC<ImageEnlargerProps> = ({ children }) => {
  const [zoom, setZoom] = useState(false)

  if (!zoom) return <span onClick={() => setZoom(true)}>{children}</span>
  else
    return (
      <div
        onClick={() => setZoom(false)}
        className="fixed z-40 inset-0 w-full flex h-full"
      >
        <div className="w-3/4 h-3/4 relative m-auto  z-40">{children}</div>
        <div className="opacity-50 fixed inset-0 z-30 bg-black"></div>
      </div>
    )
}

export default ImageEnlarger
