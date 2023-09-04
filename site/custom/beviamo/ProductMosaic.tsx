import { Image as ImageType } from '@commerce/types/common'
import { FC, useState } from 'react'

import Image from 'next/image'

interface IMosaic {
    images: ImageType[]
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductMosaic: FC<IMosaic> = ({ images }) => {
    
    
    const [mainImg, setMainImg] = useState(images[0]?.url || placeholderImg)

    return (
        <div className='grid grid-cols-4 gap-2'>
            <div>
                {
                    images[0] ?
                    images.slice(0, 3).map(image => {
                        return (
                            <div className='mb-2' onClick={() => setMainImg(image.url)}>
                                <Image 
                                    className='rounded-xl'
                                    src={image.url} 
                                    width={200} height={200} 
                                    alt='' 
                                />
                            </div>
                        )
                    }) :
                    <div className='mb-2'>
                        <Image 
                            className='rounded-xl'
                            src={placeholderImg} 
                            width={200} height={200} 
                            alt=''
                        />
                    </div>
                }
            </div>
            <div className='col-span-3'>
                <Image 
                    className='rounded-xl'
                    src={mainImg} 
                    width={1000} height={1000} 
                    alt='' 
                />
            </div>
        </div>
    )
}

export default ProductMosaic