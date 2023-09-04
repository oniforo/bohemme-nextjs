import { useState, useEffect } from 'react'

interface IWindow {
    width: number,
    height: number
}

const getWindowDimensions = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    return {
        width,
        height
    }
}

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<IWindow>({ width: 0, height: 0 })
    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions())
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}

export default useWindowDimensions