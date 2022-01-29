import {
    AnimationControls,
    motion,
    TargetAndTransition,
    VariantLabels,
} from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { StateStatus } from 'store/slices/onionsSlotsSlice'
import { sliderTransition } from './transitions'
import { IPropsSlider } from './types'

const ReportSlider: FC<IPropsSlider> = (props) => {
    const { children, status, style } = props
    const loaded = status === StateStatus.success

    const [animation, setAnimation] = useState<
        AnimationControls | TargetAndTransition | VariantLabels | boolean
    >({ y: 0 })

    const defaultPlace = { y: 0 }
    const bottomHidden = { y: 550 }

    useEffect(() => {
        status === StateStatus.success && setAnimation(defaultPlace)
        status === StateStatus.loading && setAnimation(bottomHidden)
        // eslint-disable-next-line react-Hooks/exhaustive-deps
    }, [status])
    return (
        <motion.div
            initial={StateStatus.success ? defaultPlace : bottomHidden}
            animate={animation}
            transition={sliderTransition}
            style={style ? style : ''}
        >
            {loaded && children}
        </motion.div>
    )
}

export default ReportSlider
