import { FC } from 'react'
import s from './StyleCard.module.css'
import Link from 'next/link'

interface Props {
    title: string,
    subtitle: string
}

const StyleCard: FC<Props> = ({
    title,
    subtitle
}) => {
    return (
        <div className='flex flex-grow'>
          <div className='border rounded-lg p-5 text-center w-64 min-h-64 flex flex-col'>
            <div className='font-bold'>{title}</div>
            <div className='flex-grow'>{subtitle}</div>
            <Link href='/search'>
              <div className='w-fit mx-auto my-3 px-3 py-1 rounded-lg font-bold'>Ver cervejas</div>
            </Link>
          </div>
        </div>
    )
}

export default StyleCard