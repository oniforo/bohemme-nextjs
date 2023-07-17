import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-8 border-b border-accent-2 p-12 text-primary bg-primary transition-colors duration-150">
          <div className='col-span-3'>
            <div className='text-xl font-bold mb-2'>beviamo</div>
            <div>quem somos</div>
            <div>contato</div>
            <div>política de privacidade</div>
          </div>
          <div className='col-span-3'>
            <div className='text-xl font-bold mb-2'>encontre sua cerveja</div>
            <div>cervejas por estilo</div>
            <div>cervejarias parceiras</div>
            <div>cervejas importadas</div>
          </div>
          <div className='col-span-3'>
            <div className='text-xl font-bold mb-2'>entre em contato</div>
            <div>(21) 2345-6789</div>
            <div>contato@bviamo.com.br</div>
            <div>endereço do local</div>
          </div>
          <div className='col-span-3 mb-2'>
            <div className='text-xl font-bold mb-2'>redes sociais</div>
            <div className='flex'>
              <div className='border rounded-full w-8 h-8 mr-2'></div>
              <div className='border rounded-full w-8 h-8 mr-2'></div>
              <div className='border rounded-full w-8 h-8 mr-2'></div>
              <div className='border rounded-full w-8 h-8 mr-2'></div>
            </div>          
          </div>
          {/* <div className="col-span-1 lg:col-span-4 border">
            <Link
              href="/"
              className="flex flex-initial items-center font-bold md:mr-24"
            >
              <span className="rounded-full border border-accent-6 mr-2">
                <Logo />
              </span>
              <span>ACME</span>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-4 border">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link
                    href={page.url!}
                    className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150"
                  >
                    {page.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-4 flex items-start lg:justify-end text-primary border">
            <div className="flex space-x-4 items-center h-10">
              <ThemeSwitcher />
              <I18nWidget />
              <a
                className={s.link}
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
              >
                <Github />
              </a>
            </div>
          </div> */}
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2023 Beviamo Ecommerce de Cervejas. CNPJ 25.231.363/0001-69. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <span className="text-primary">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary"
            >
              <Vercel
                className="inline-block h-6 ml-3 text-primary"
                alt="Vercel.com Logo"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
