import {
    AnimationControls,
    motion,
    TargetAndTransition,
    VariantLabels,
} from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { StateStatus } from 'store/helpers/Status'
import { AideColors, Flex, GlovoColors } from 'components/styled'
import { sliderTransition } from './transitions'
import { IPropsSlider } from './types'
import { useAppSelector } from 'hooks'
import { Theme } from 'components/themes'

const HeaderSlider: FC<IPropsSlider> = (props) => {
    const { children, backgroundImage, backgroundSize, status, reportIsEmpty } =
        props
    const theme = useAppSelector((state) => state.theme.theme)
    const border =
        theme === Theme.aide
            ? `3px solid ${AideColors.white}`
            : `3px solid ${GlovoColors.darkGrey}`
    const topScreenPart = { y: ' -550%' }
    const centerScreenPart = { y: 0 }
    const [animation, setAnimation] = useState<
        AnimationControls | TargetAndTransition | VariantLabels | boolean
    >(centerScreenPart)

    const initialPosition = StateStatus.success
        ? topScreenPart
        : centerScreenPart

    useEffect(() => {
        status === StateStatus.success && setAnimation(topScreenPart)
        status === StateStatus.loading && setAnimation(centerScreenPart)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, reportIsEmpty])

    return (
        <motion.div
            initial={initialPosition}
            animate={animation}
            transition={sliderTransition}
            style={{
                height: '5em',
                // width: '77%',
                // position: 'absolute',
                // top: '40em',
                width: '75%',
                position: 'fixed',
                top: '50%',
                left: '20%',
                zIndex: '2',
            }}
        >
            <Flex
                justify={'center'}
                padding={'1em 1em 1em 1em'}
                border={border}
                bRadius={'10px'}
                bFilter={`blur(2px)`}
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

export default HeaderSlider
