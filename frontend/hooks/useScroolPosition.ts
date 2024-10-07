'use client'

import { useEffect, useState } from "react"

export const useScroolPosition = () => {

    const [scroolPosition, setScroolPosition] = useState(0)
    useEffect(() => {

        const updatePosition = () => {
            setScroolPosition(window.pageYOffset)
        }

        window.addEventListener('scroll', updatePosition)

        updatePosition()

        return () => window.removeEventListener('scroll', updatePosition)
    }, [])

    return scroolPosition
}