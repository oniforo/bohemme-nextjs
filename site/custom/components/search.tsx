import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import type { Brand } from '@commerce/types/site'
import type { Product } from '@commerce/types/product'

import { Layout } from '@components/common'
import { Container, Skeleton } from '@components/ui'

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

import { ProductCard } from '@custom/beviamo'

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
    brandId: activeBrand?.id,
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

  return (
    <Container>
      <div className='mt-4'>
        <div>Início &gt; Cervejas por estilo</div>
        <div className='text-4xl font-bold mb-4'>Cervejas por estilo</div>
        {/* <div>activeBrand: {JSON.stringify(activeBrand)}</div>
        <div>activeCategory: {JSON.stringify(activeCategory)}</div>
        <div>activeFilter: {JSON.stringify(activeFilter)}</div> */}
        <div className='flex mb-4'>
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
      </div>
      {/* Full Grid - 5 columns */}
      <div className='grid grid-cols-5 gap-4 mb-4'>
        {/* Sidebar */}
        <div className='col-span-1'>
          <div className='text-2xl font-bold mb-4'>Filtrar</div>
          <div className='text-xl'>Preço</div>
          
          <div className='mb-4'>
            <input className='appearance-none outline-none bg-gray-700 h-2 rounded-full'
              type='range' min='50' max='500' defaultValue='300' step='10' />
          </div>
          
          <div className='text-xl my-4'>Estilos de cerveja</div>
          {
            categories.map(category => {
              return (
                <div className='block mb-2'>
                  <input className='mr-1' type='checkbox' id={category.id} value={category.name}/>
                  <label htmlFor={category.id}> {category.name}</label>                
                </div>
              )
            })
          }
                    
          <div className='text-xl my-4'>Cervejarias parceiras</div>
          {
            brands.map(brand => {
              return (
                <div className='block mb-2'>
                <input className='mr-1' type='checkbox' id={brand.id} value={brand.name}/>
                <label htmlFor={brand.id}> {brand.name}</label>                
                </div>
              )
            })
          }
          
        </div>
        {/* Products */}
        <div className='col-span-4 grid grid-cols-4 gap-4'>          
          { 
            data?.products.map(product => <ProductCard data={product} />)
          }
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
