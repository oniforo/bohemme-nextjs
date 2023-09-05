import { getSearchStaticProps } from '@custom/lib/search-props'
import type { GetStaticPropsContext } from 'next'
import Search from '@custom/components/brewery'

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context)
}

export async function getStaticPaths() {
  const { partners } = await require('../../../data')
  const paths = partners.map((partner: { slug: string }) => (
    { params: { name: partner.slug } }
  ))
  return {
    paths,
    fallback: false,
  }
}

export default Search
