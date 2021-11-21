import React, { FC } from 'react'
import { motion } from 'framer-motion'
import logo from './../../assets/img/logo.svg'
import { Flex } from './Flex'

interface PropsLoaderReact {
    animate: string
}

const LoaderReact: FC<PropsLoaderReact> = (props) => {
    const { animate } = props
    return (
        <Flex
            width={'30%'}
            justify={'center'}
            align={'center'}
            margin={'15% 0 0 10em'}
        >
            <motion.img
                src={logo}
                alt={'logo'}
                // initial={{}}
                animate={animate}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
        </Flex>
    )
}

export default LoaderReact
