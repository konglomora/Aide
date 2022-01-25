import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from './../../assets/img/logo.svg'
import { Flex } from './Flex'
import { StateStatus } from 'store/slices/onionsSlotsSlice'

interface PropsLoaderReact {
    style?: {
        width?: string
        margin?: string
    }
    status?: StateStatus | null
}

const LoaderReact: FC<PropsLoaderReact> = ({ style, status }) => {
    const variants = {
        motion: { rotate: 480 },
        static: { rotate: 0 },
    }

    return (
        <Flex
            width={style ? style.width : '30%'}
            justify={'center'}
            align={'center'}
            margin={style ? style.margin : '15% 0 0 10em'}
        >
            {status === StateStatus.success ? (
                <motion.img
                    src={logo}
                    alt={'logo'}
                    initial={'static'}
                    animate={'static'}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 0.2,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                    }}
                    variants={variants}
                />
            ) : (
                <motion.img
                    src={logo}
                    alt={'logo'}
                    initial={'static'}
                    animate={'motion'}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 0.2,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                    }}
                    variants={variants}
                />
            )}
            {/* <motion.img
                src={logo}
                alt={'logo'}
                initial={'static'}
                animate={status === StateStatus.success ? 'static' : 'motion'}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                }}
                variants={variants}
            /> */}
        </Flex>
    )
}

export default LoaderReact
