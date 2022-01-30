import {
    AnimationControls,
    motion,
    TargetAndTransition,
    VariantLabels,
} from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { StateStatus } from 'store/slices/onions/onionsSlotsSlice'
import { Flex } from 'components/styled'
import { sliderTransition } from './transitions'
import { IPropsSlider } from './types'

const SliderCard: FC<IPropsSlider> = (props) => {
    const { children, backgroundImage, backgroundSize, status } = props

    const [animation, setAnimation] = useState<
        AnimationControls | TargetAndTransition | VariantLabels | boolean
    >({ y: 0 })

    const topScreenPart = { y: ' -650%' }
    const centerScreenPart = { y: 0 }
    useEffect(() => {
        status === StateStatus.success && setAnimation(topScreenPart)
        status === StateStatus.loading && setAnimation(centerScreenPart)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <motion.div
            initial={StateStatus.success ? topScreenPart : centerScreenPart}
            animate={animation}
            transition={sliderTransition}
            style={{
                height: '5em',
                width: '77%',
                position: 'absolute',
                top: '40em',
                left: '20%',
                zIndex: '2',
            }}
        >
            <Flex
                justify={'center'}
                padding={'1em 1em 1em 1em'}
                border={'2px solid white'}
                bRadius={'10px'}
                bFilter={'blur(2px)'}
                height="3em"
                mHeight="3%"
                width="95%"
                background={backgroundImage}
                backSize={backgroundSize}
            >
                {children}
            </Flex>
        </motion.div>
    )
}

export default SliderCard
