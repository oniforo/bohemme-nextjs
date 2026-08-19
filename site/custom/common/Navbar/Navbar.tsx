import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { /* Logo,  */Container } from '@components/ui'
/* import Logo from '@custom/ui/Logo/Logo'
import LogoWritten from '@custom/ui/Logo/LogoWritten' */
import { /* Searchbar, */ UserNav } from '@components/common'
import Searchbar from '@custom/common/Searchbar'
import Image from 'next/image'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const BottomNavbar: FC<NavbarProps> = ({ links }) => {
  return (
    <Container clean className="mx-auto max-w-8xl px-6 justify-center hidden md:flex">
      <div className={s.nav.concat('')}>
        <div className="flex items-center flex-1">
          <nav className={s.navMenu}>
            <NavLink href='/' title='Início' />
            <NavLink href='/search/' title='Cervejas' />
            <NavLink href='/search/estilos' title='Estilos' />
            <NavLink href='/search/acessorios' title='Copos' />            
            <NavLink href='/search/cervejarias' title='Cervejarias' />
            <NavLink href='/sobre' title='Quem somos' />
            <NavLink href='/contato' title='Contato' />
            {/* On hover, open nacionais/importadas and a sublist of items */}
            {/* On hover, open dropdown with list of styles */}
            {/* On hover, copos, taças e outros acessórios */}
          </nav>
        </div>
      </div>
    </Container>
  )
}

const NavLink: FC<{ href: string, title: string }> = ({ href, title }) => {
  return (
    <Link href={href} className={s.link}>
      {title}
    </Link>
  )
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container /* clean */ className="mx-auto max-w-8xl px-6 lg:pt-2">
      <div className={s.nav}>
        <div className="flex items-center flex-1">
          <Link href='/' className={s.logo.concat(' flex items-center')}>
            <div><Image src={'/logo.png'} width={30} height={30} alt='logo' /></div>
            <div><Image src={'/beviamo.png'} width={150} height={30} alt='beviamo' /></div>
          </Link>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar className='rounded-full'/>
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav bagColor='white' />
        </div>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" className='rounded-full'/>
        </div>
      )}
    </Container>
    <BottomNavbar links={links} />
  </NavbarRoot>
)

export default Navbar
