import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'
import { CSSProperties } from 'styled-components'

interface IFallingCard {
    children: ReactNode
    style: CSSProperties
}

const FallingCard: FC<IFallingCard> = ({ children, style }) => {
    return (
        <motion.div
            initial={{ y: -2000 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, type: 'spring' }}
            style={style}
        >
            {children}
        </motion.div>
    )
}

export default FallingCard
