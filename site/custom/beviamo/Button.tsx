import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAddItem } from '@framework/cart'
import { useUI } from '@components/ui'
import type { Product } from '@commerce/types/product'
import { 
    getProductVariant, selectDefaultOptionFromProduct, SelectedOptions 
} from '@components/product/helpers'

const baseStyle = 'p-1 rounded-lg m-2 bg-amber-900 text-white hover:scale-105 '

interface IButton {
    href: string,
    innerText: string,
    className?: string
}
  
const Button = ({ href, innerText, className }: IButton) => {
    return (
      <Link href={href}>
        <div className={baseStyle.concat(className ? className : '')}>
          {innerText}
        </div>
      </Link>
    )
}

interface AddToCartButtonProps {
    product: Product,
    className?: string
}

const AddToCartButton = (
    { product, className }: AddToCartButtonProps
) => {
    
    const addItem = useAddItem()
    const { openSidebar, setSidebarView } = useUI()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | Error>(null)
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

    useEffect(() => {
        selectDefaultOptionFromProduct(product, setSelectedOptions)
      }, [product])

    const variant = getProductVariant(product, selectedOptions)
    const addToCart = async () => {
        setLoading(true)
        setError(null)
        try {
            await addItem({
                productId: String(product.id),
                variantId: String(variant ? variant.id : product.variants[0]?.id),
            })
            setSidebarView('CART_VIEW')
            openSidebar()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            if (err instanceof Error) {
                console.error(err)
                setError({
                ...err,
                message: 'Could not add item to cart. Please try again.',
                })
            }
        }
    }

    return (
        <div 
            className={baseStyle.concat('cursor-pointer ', className ? className : '')}
            onClick={addToCart}
        >
          {
            variant?.availableForSale === false
              ? 'Indisponível'
              : 'Adicionar ao carrinho'
            }
        </div>
    )
}

export { AddToCartButton, Button }