import { Fragment } from 'react'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import commerce from '@lib/api/commerce'

/* Default components */
import { Layout } from '@components/common'
import { Container } from '@components/ui'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import duvidas from 'data/duvidas.json'
import estilos from 'data/estilos.json'

/* Custom components and hooks */
import { useWindowDimensions } from '@custom/hooks'
import { Button, PartnerScroller, ProductCard, Title } from '@custom/beviamo'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 10 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  const productVariants = products.map((product) => {
    return commerce.getProduct({
      variables: { slug: product.slug as string },
      config,
      preview
    })
  })

  const productVariantsPromise = await Promise.all(productVariants)

  const productsWithVariants = productVariantsPromise.map(products => {
    return products.product
  })

  return {
    props: {
      products: productsWithVariants,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

const slidesPerView = (width: number) => {
  return width > 1140 ? 5 : width > 860 ? 4 : width > 580 ? 3 : width > 300 ? 2 : 1
}

const spaceBetween = (width: number) => {
  return width > 580 ? 30 : width > 300 ? 10 : 0
}

export default function Home({
  products, brands
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const { width } = useWindowDimensions()  

  return (
    <div className='overflow-hidden'>
      <div className='h-96 relative flex justify-center items-center select-none'>
        <div className='absolute text-white z-10 max-w-[1232px] pl-8'>
          <div className='text-4xl md:text-6xl font-extrabold'>Beviamo</div>
          <div className='md:text-xl my-2 w-11/12 md:w-4/5'>Bem-vindos à nossa loja online de cervejas artesanais! Aqui você encontrará uma ampla variedade de cervejas de alta qualidade, cuidadosamente selecionadas dos melhores produtores artesanais. Estejam prontos para explorar e desfrutar deste mundo fascinante.</div>
          <Link href='sobre'>
            <div className='md:text-xl font-bold underline'>Saiba mais</div>
          </Link>
        </div>
        <Image src={'/banner.png'} fill={true} alt='' style={{objectFit: 'cover', zIndex: 0, userSelect: 'none'}} />
      </div>

      {/* TOP 10 */}
      <Container className='select-none py-8 border-b'>
        <Title text='Seleção Beviamo, as 10 mais adoradas' />
        <Swiper
          // @ts-ignore
          slidesPerView={slidesPerView(width)}
          spaceBetween={spaceBetween(width)}
          modules={[Pagination]}
          pagination={{clickable: true}}
        >
          {
            products.map(product => (              
              <SwiperSlide key={product?.slug}>
                <ProductCard data={product} />                  
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Container>

      {/* INFINITE SCROLLER */}
      <Container className='select-none py-8'>
        <Title text='Nossas cervejarias parceiras' />
      </Container>
      <PartnerScroller />

      {/* Frete, parcelas, não curtiu? */}
      {/* Consultar /data/duvidas.json */}
      <div className='bg-amber-50 select-none'>
        <Container className='grid lg:grid-cols-3 gap-4 py-8'>
          {
            duvidas.map(element => {
              return (
                element.active && 
                <div key={element.name} className='flex'>
                  <div className='w-12 h-12 min-w-max'>
                    <Image src={element.path} width={50} height={50} alt={element.description}
                    />
                  </div>
                  <div className='ml-5'>
                    <div className='font-bold'>{element.name}</div>
                    <div className=''>{element.description}</div>
                  </div>
                </div>
              )
            })
          }          
        </Container>
      </div>
      
      {/* CONFIRA OS ESTILOS DE CERVEJAS QUE TEMOS */}
      <div className='bg-gray-100'>
        <Container className='select-none py-8'>        
          <div className='font-bold text-2xl lg:text-4xl mb-8'>
            Confira alguns de nossos estilos de cerveja
          </div>          
          <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              ['IPA', 'Stout', 'Witbier', 'Sour', 'Stout'].map(style => {
                return (
                  <div key={style} className='flex'>
                    <div className='border rounded-lg p-5 text-center flex flex-col border-amber-900'>
                      <div className='text-amber-900 font-bold mb-2'>{style}</div>
                      {/* Understand further about this type casting */}
                      <div className='flex-grow'>{(estilos as any)[style]}</div>
                      <Button href='search' innerText='Ver cervejas' className='w-fit mx-auto px-3' />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Container>
      </div>

    </div>
  )
}

Home.Layout = Layout
