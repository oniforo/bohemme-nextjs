import { FC } from 'react'
import Image from 'next/image'

import type { Product } from '@commerce/types/product'

import { Container, Rating } from "@components/ui"

import { AddToCartButton } from './Button'
import Title from './Title'
import ProductCard from './ProductCard'
import Reviews from './Reviews'

const placeholderImg = '/product-img-placeholder.svg'

import duvidas from '../../data/produtos.json'
import reviews from '../../data/reviews.json'

interface ProductViewProps {
    product: Product,
    relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
    return (
        <Container className=''>

            <div className='border grid grid-cols-2 pt-4 gap-4'>

                {/* LEFT PANE */}
                <div id='left-pane' >
                    
                    {/* IMAGE BOXES */}
                    <div className='grid grid-cols-4 gap-2 border'>
                        <div>
                            <div className='mb-2'>
                                <Image src={placeholderImg} width={200} height={200} alt='' />
                            </div>
                            <div className='mb-2'>
                            <Image src={placeholderImg} width={200} height={200} alt='' />
                            </div>
                            <div className='mb-2'>
                            <Image src={placeholderImg} width={200} height={200} alt='' />
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <Image src={placeholderImg} width={1000} height={1000} alt='' />
                        </div>
                    </div>

                    {/* ADDITIONAL INFO - /data/produtos.json */}
                    <div className='border p-4 pb-0 border-amber-700 rounded-xl my-8'>
                        {
                            duvidas.map(duvida => {
                                return (
                                    <div className='flex mb-4'>
                                        <div>
                                            <Image src={duvida.url || placeholderImg} width={50} height={50} alt='' className='mr-4' />
                                        </div>
                                        <div>
                                            <div className='font-bold'>{duvida.title}</div>
                                            <div>{duvida.subtitle}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                {/* RIGHT PANE */}
                <div id='right-pane'>
                    <div>Breadcrumb &gt; Breadcrumb &gt; Breadcrumb &gt; Breadcrumb</div>
                    <div className='text-4xl font-bold mt-4'>{product.name}</div>
                    <div>{product.vendor}</div>
                    <Rating value={5} />                
                    <div className='text-4xl font-semibold'>R$ {product.price.value.toFixed(2)}</div>
                    
                    <div className='flex my-4'>
                        <input type='number' className='border w-24 text-center rounded-xl' min={1} />
                        <AddToCartButton product={{variants: []}} />
                    </div>
                    
                    <div className='my-8'>
                        <div><span className='font-bold'>Estilo: </span>Cerveja de trigo</div>
                        <div><span className='font-bold'>ABV: </span>4.5%</div>
                        <div><span className='font-bold'>IBU: </span>10</div>
                        <div><span className='font-bold'>EBC: </span>06</div>                    
                    </div>
                    <div>
                        <div className='font-bold'>Características:</div>
                        <div>Como numa sinfonia, a combinação dos lúpulos Citra, Mosaic e Talus traz intensas notas de frutas tropicais, abacaxi, coco e manga. A Symphony é nossa Juicy IPA com visual turvo, corpo sedoso e alta drinkability.</div>
                    </div>
                    <div>Product: {JSON.stringify(product)}</div>
                    <div>Related products: {JSON.stringify(relatedProducts)}</div>
                    
                </div>
            
            </div>

            {/* RATINGS AND QUESTIONS */}
            <div>
                <Title text='O que nossos clientes estão dizendo...' />                
                <Reviews data={reviews} />            
            </div>

            {/* RELATED PRODUCTS */}
            <div>
                <Title text='Cervejas que você pode curtir também' />
                <div className='grid grid-cols-5 gap-4 border'>
                    { [1, 2, 3, 4, 5].map(product => <ProductCard />) }
                    {
                        relatedProducts.map(product => {
                            return (
                                <ProductCard data={product} />
                            )
                        })
                    }
                </div>
            </div>

        </Container>
    )
}

export default ProductView