import Link from 'next/link'
import Image from 'next/image'
import { partners } from '../../data'

const PartnerGroup = () => {
    return (
        <div className='flex w-min animate-slide group-hover:pause'>
            {
                partners.map(partner => (
                    <Link 
                        key={partner.slug} 
                        href={`/search/cervejarias/${partner.slug}`} 
                        className='mx-4 w-24 md:w-32 hover:scale-110 cursor-pointer'
                    >
                        <Image src={partner.image} width={300} height={300} alt='' />
                    </Link>
            ))
            }
        </div>
    )
}

const PartnerScroller = () => {
    return (
        <div className='mb-8 flex group'>
            <PartnerGroup />
            <PartnerGroup />
            <PartnerGroup />
        </div>
    )
}

export default PartnerScroller