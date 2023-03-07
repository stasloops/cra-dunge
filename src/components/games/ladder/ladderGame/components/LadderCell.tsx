import React, { FC, useEffect, useState } from 'react'

type Cell = {
    tag: string
    color: string
    position: number
}

type LadderCellProps = {
    id: number
    item: Cell
    activeСell: number[]
    moveGame: (id: number, position: number) => void
}

const LadderCell: FC<LadderCellProps> = ({ id, item, activeСell, moveGame }) => {
    const [equalCell, setEqualCell] = useState<number | null>()
  

    const sortActiveСell = () => {
        const equal = activeСell?.filter((item: number) => item === id)
        setEqualCell(equal[0])
    }

    useEffect(() => {
        sortActiveСell()
    }, [activeСell])

    
    return (
        <div style={{ pointerEvents: equalCell === id ? 'auto' : 'none', opacity: equalCell === id ? '1' : '' }} onClick={() => moveGame(item.position, id)} className='ladder__game-item'>
            <div style={{ backgroundColor: item.color }} className='ladder__game-item__hero'>
                {item.tag ? item.tag : ''}
            </div>
        </div>
    )
}

export default LadderCell