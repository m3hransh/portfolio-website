import { buildUrl, extractPublicId } from 'cloudinary-build-url'

export const buildBlurUrl = (url: string) => {
  url = buildUrl(extractPublicId(url), {
    cloud: {
      cloudName: 'm3hransh',
      version: '1644765161',
      resourceType: 'image',
      storageType: 'upload',
    },
    transformations: {
      //Resize the image
      effect: {
        name: 'blur',
        value: 800,
      },
      resize: {
        width: 70,
      },
      quality: 1,
    },
  })
  return url
}
