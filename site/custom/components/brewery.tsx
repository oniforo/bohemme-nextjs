import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import type { Brand } from '@commerce/types/site'
import type { Product } from '@commerce/types/product'

import { Layout } from '@components/common'
import { Container, Rating, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'
import rangeMap from '@lib/range-map'

import Image from 'next/image'
const placeholderImg = '/product-img-placeholder.svg'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import ErrorMessage from '@components/ui/ErrorMessage'

import { ProductCard, PartnerScroller } from '@custom/beviamo'
import { partners } from '../../data'

export default function Search({ categories, brands }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)

  const activeCategory = categories.find((cat: any) => cat.slug === category)
  const activeBrand = brands.find((b: Brand) => b.slug === brand)

  const { data, error } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    /* brandId: activeBrand?.id, */
    brandId: brand,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  if (error) {
    return <ErrorMessage error={error} />
  }

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  const metadata = partners.filter(p => p.slug === brand)

  return (
    <Container>
      <div className='mt-4 mb-12'>
        <div className='mb-8'>Início &gt; Cervejarias &gt; {activeBrand?.name}</div>
        
        {/* <div className='text-4xl font-bold mb-4'>{activeBrand?.name}</div>        
        <div>activeBrand: {JSON.stringify(activeBrand)}</div>
        <div>activeCategory: {JSON.stringify(activeCategory)}</div>
        <div>activeFilter: {JSON.stringify(activeFilter)}</div>
        <div>category: {category}</div>
        <div>brand: {brand}</div>
        <div>brands: {JSON.stringify(brands)}</div><br/> */}
        
        <div className='grid grid-cols-5 gap-4'>
          <div className=''>
            <Image src={metadata[0]?.image} width={300} height={300} alt='' />
            <div>Origem</div>
            <div>Site</div>
            <div>Redes sociais</div>
            <div>Fundado em</div>
            <div>Rating untappd</div>
            <div>Outros metadados</div>
          </div>
          <div className='col-span-4'>
            <div className='text-4xl font-bold'>{activeBrand?.name}</div>
            <Rating value={4} />
            <div>{metadata[0]?.description}</div>
            <div className='flex my-4'>
              {
                categories.map(category => {
                  return <div key={category.name} className='rounded-full px-8 py-2 mr-2 bg-gray-700 text-white cursor-pointer'>
                    {category.name}
                  </div>
                })
              }
            </div>
            <div className='text-right my-4'>
              Ordenar por: <select className='p-2 rounded-xl bg-white border'>
                <option>Destaques</option>
                <option>Relevância</option>
                <option>Preço</option>
              </select>
            </div>
            <div className='grid grid-cols-4 gap-4 mt-8'>
              { data?.products.map(product => <ProductCard data={product} />) }
            </div>
          </div>
        </div>
      
      </div>
      
      <PartnerScroller />

    </Container>
  )
}

Search.Layout = Layout
