import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Container } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import ProductSlider from '../custom/product/ProductSlider'
import Hero from '../custom/ui/Hero'
import StyleCard from '../custom/components/StyleCard'

import Link from 'next/link'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
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

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero
        headline=" Beviamo"
        description="Bem-vindos à nossa loja online de cervejas artesanais! Aqui você encontrará uma ampla variedade de cervejas de alta qualidade, cuidadosamente selecionadas dos melhores produtores artesanais. Estejam prontos para explorar e desfrutar deste mundo fascinante."
      />
      <div className='bg-white text-black p-5 font-bold text-3xl'>
        Top 10 Cervejas Mais Adoradas
      </div>
      <ProductSlider>
      {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 0 ? 500 : 200,
              height: i === 0 ? 500 : 200,
              priority: true,
            }}
          />
        ))}
      </ProductSlider>
      <div className='bg-white text-black p-5 font-bold text-3xl'>
        Nossas Cervejarias Parceiras
      </div>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>

      {/* Frete, parcelas, não curtiu? */}
      <div className='flex p-16 bg-gray-100 text-black'>
        <div className='flex flex-grow'>
          <div className='border w-16 h-16'></div>
          <div className='ml-5'>
            <div className='font-bold'>Frete</div>
            <div className=''>Falar sobre frete</div>
          </div>
        </div>
        <div className='flex flex-grow'>
          <div className='border w-16 h-16'></div>
          <div className='ml-5'>
            <div className='font-bold'>Parcelas</div>
            <div className=''>Falar sobre parcelamento</div>
          </div>
        </div>
        <div className='flex flex-grow'>
          <div className='border w-16 h-16'></div>
          <div className='ml-5'>
            <div className='font-bold'>Não curtiu?</div>
            <div className=''>Falar sobre reembolso</div>
          </div>
        </div>
      </div>
      
      <div className='bg-white text-black p-5 font-bold text-3xl'>
        Confira os estilos de cervejas que temos
      </div>

      {/* Uncomment the container after understanding how to manipulate theme color */}
      {/* <Container> */}
      <div className='flex p-16 bg-white text-black'>        
        <StyleCard
          title='IPA'
          subtitle='Uma cerveja ousada e lupulada, com aromas intensos de lúpulo e um amargor marcante, para os amantes de sabores intensos e experiências sensoriais únicas.'
        />
        <StyleCard
          title='Stout'
          subtitle='Uma cerveja escura, encorpada e rica em sabores tostados e achocolatados, ideal para apreciar nos dias frios e momentos de contemplação.'
        />
        <StyleCard
          title='Witbiter'
          subtitle='Uma cerveja refrescante de trigo, com notas cítricas e condimentadas, perfeita para dias ensolarados e momentos de descontração.'
        />
        <StyleCard 
          title='Sour' 
          subtitle='Uma cerveja ácida e refrescante, com um perfil de sabor complexo que combina acidez, frutas e notas tropicais, proporcionando uma experiência sensorial surpreendente.'
        />
      </div>
      {/* </Container> */}
      
    </>
  )
}

Home.Layout = Layout
