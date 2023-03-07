import React, { useEffect, useRef } from "react"

export const useClose = (toggleFunc: (state: boolean) => void) => {
    const value = useRef<HTMLInputElement | null>(null)

    const closeHandler = (e: MouseEvent) => {
        const path: EventTarget[] = e.composedPath()
            if (value.current && !path.includes(value.current)) {
                toggleFunc(false)
            }
    }

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', closeHandler)
        })
        return () => {
            document.removeEventListener('click', closeHandler)
        }
    }, [])

    return {
        value
    }
}