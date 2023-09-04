import { FC } from 'react'
import Image from 'next/image'

import type { Product } from '@commerce/types/product'

import { Container, Rating } from "@components/ui"

import { AddToCartButton } from './Button'
import Title from './Title'
import ProductCard from './ProductCard'
import Reviews from './Reviews'
import ProductMosaic from './ProductMosaic'

import useWindowDimensions from '@custom/hooks/useWindowDimensions'

const placeholderImg = '/product-img-placeholder.svg'

import duvidas from '../../data/produtos.json'
import reviews from '../../data/reviews.json'

interface ProductViewProps {
    product: Product,
    relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
    
    const { width } = useWindowDimensions()
    const maxRelated = width > 1140 ? 5 : width > 860 ? 4 : width > 580 ? 3 : width > 300 ? 4 : 2

    return (
        <Container className=''>

            <div className='grid md:grid-cols-2 pt-4 lg:pt-8 gap-4'>

                {/* LEFT PANE */}
                <div id='left-pane' >

                    <div className='md:hidden'>
                        <div className='mb-4'>Breadcrumb &gt; Breadcrumb &gt; Breadcrumb</div>
                        <div className='text-4xl font-bold mt-4'>{product.name}</div>
                        <div className='text-2xl'>{product.vendor}</div>
                        <Rating value={5} />
                        <div className='text-4xl font-semibold mb-4'>R$ {product.price.value.toFixed(2)}</div>
                    </div>

                    {/* PRODUCT MOSAIC */}
                    <ProductMosaic images={product.images} />

                    {/* ADDITIONAL INFO - /data/produtos.json */}
                    <div className='hidden md:block border p-4 pb-0 border-amber-700 rounded-xl my-8'>
                        {
                            duvidas.map(duvida => {
                                return (
                                    <div className='flex mb-4'>
                                        <div className='mr-4'>
                                            <Image src={duvida.url || placeholderImg} width={50} height={50} alt='' />
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

                    <div className='hidden md:block'>
                        <div className='hidden md:block'>Breadcrumb &gt; Breadcrumb &gt; Breadcrumb</div>
                        <div className='text-4xl font-bold mt-4'>{product.name}</div>
                        <div>{product.vendor}</div>
                        <Rating value={5} />
                        <div className='text-4xl font-semibold'>R$ {product.price.value.toFixed(2)}</div>
                    </div>

                    
                    <div className='flex my-4'>
                        <input type='number' className='border w-24 text-center rounded-xl' min={1} />
                        <AddToCartButton product={product} />
                    </div>                                        
                    
                    <div>
                        <div className='font-bold'>Características:</div>
                        <div>Como numa sinfonia, a combinação dos lúpulos Citra, Mosaic e Talus traz intensas notas de frutas tropicais, abacaxi, coco e manga. A Symphony é nossa Juicy IPA com visual turvo, corpo sedoso e alta drinkability.</div>
                    </div>

                    {/* DETAILS */}
                    <div className='grid grid-cols-6 gap-4 mt-4'>
                        {
                            [
                                { key: 'ABV', value: '4.5%' },
                                { key: 'IBU', value: '10' },
                                { key: 'EBC', value: '06' }
                            ].map(({ key, value }) => {
                                return (
                                    <div className=''>
                                        <div className='text-center mb-2 font-bold'>{key}</div>
                                        <div className='
                                            aspect-square flex justify-center items-center rounded-xl
                                            text-xl md:text-2xl font-semibold bg-amber-900 text-white
                                        '>{value}</div>
                                    </div>            
                                )
                            })
                        }                
                    </div>
                    {/* <br/><div>Product: {JSON.stringify(product)}</div> */}
                    {/* <div>Related products: {JSON.stringify(relatedProducts)}</div> */}
                    
                    {/* ADDITIONAL INFO [MOBILE ONLY] - /data/produtos.json */}
                    <div className='md:hidden border p-4 pb-0 border-amber-700 rounded-xl my-8'>
                        {
                            duvidas.map(duvida => {
                                return (
                                    <div className='flex mb-4'>
                                        <div className='mr-4'>
                                            <Image src={duvida.url || placeholderImg} width={50} height={50} alt='' />
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
            
            </div>

            {/* RATINGS AND QUESTIONS */}
            <div>
                <Title text='O que nossos clientes estão dizendo...' />                
                <Reviews data={reviews} />            
            </div>

            {/* RELATED PRODUCTS */}
            <div>
                <Title text='Cervejas que você pode curtir também' />
                <div className='
                    grid gap-4
                    card2:grid-cols-2 card3:grid-cols-3 card4:grid-cols-4 card5:grid-cols-5
                '>
                    {
                        relatedProducts.slice(0, maxRelated).map(product => {
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