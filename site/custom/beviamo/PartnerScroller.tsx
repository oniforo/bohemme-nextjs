import Image from 'next/image'

const partners = [
    'frohenfeld.png',
    'hocus-pocus.png',
    'oca.png',
    'octopus.png',
    'under-tap.png',
    'maali.png',
    'zalaz.png'
]

const PartnerGroup = () => {
    return (
        <div className='flex w-min animate-slide group-hover:pause'>
            {
                partners.map(logo => (
                    <div className='mx-4 w-24 md:w-32 hover:scale-110 cursor-pointer'>
                        <Image src={'/partners/'.concat(logo)} width={300} height={300} alt='' />
                    </div>
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