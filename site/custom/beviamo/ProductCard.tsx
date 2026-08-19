import Link from 'next/link'
import Image from 'next/image'

import { AddToCartButton } from './Button'

const placeholderImg = '/product-img-placeholder.svg'
const placeholderProduct = {
    slug: 'placeholder-slug',
    images: [{url: '/product-img-placeholder.svg'}],
    name: 'Placeholder Beer',
    vendor: 'Beviamo',
    price: {value: 99.9 },
    variants: []
}

/* Call ProductCard with no data prop to load a placeholder card */
const ProductCard = ({ data }: any) => {
    
    const product = data ? data : placeholderProduct
    const containerStyle = 'border rounded-2xl overflow-hidden border-amber-900 mb-8 h-min'
    
    return (
        <div className={containerStyle}>
            <Link href={`/product/${product.slug}`}>
                <Image 
                src={product.images[0]?.url || placeholderImg}
                alt='' width={250} height={250} 
                style={{ objectFit: 'contain' }}
                />
            </Link>
            <div className='p-2 text-center'>
                <div className='text-xl truncate'>{product.name}</div>
                <div className='truncate'>{product.vendor}</div>
                <div>[adicionar estilos]</div>
                <div className='my-2 text-xl font-bold'>
                R$ {product.price.value.toFixed(2)}
                </div>                      
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default ProductCard