import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'

interface IPropsAnimatedPage {
    children?: ReactNode
}

const animations = {
    initial: { opacity: 0, x: 1000 },
    animation: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -1000 },
}

const AnimatedPage: FC<IPropsAnimatedPage> = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    )
}

export default AnimatedPage
