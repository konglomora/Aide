import { motion } from 'framer-motion'
import { FC } from 'react'
import { AideColors, Flex, GlovoColors, Title } from 'components/styled'
import { Theme } from 'components/themes'
import { IFooterSlider } from './types'

export const FooterSlider: FC<IFooterSlider> = (props) => {
    const { href, title, theme, icon } = props
    console.log('Theme', theme)
    const sliderBackGround =
        theme === Theme.aide ? AideColors.lightBlack : GlovoColors.white

    const sliderTitleColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey

    const sliderHoverBackground =
        theme === Theme.aide ? AideColors.violet : GlovoColors.yellow

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, type: 'spring' }}
            style={{
                width: '100%',
                position: 'fixed',
                top: 'auto',
                bottom: '0',
            }}
        >
            <a
                href={href}
                target={'_blank'}
                style={{ textDecoration: 'none' }}
                rel="noreferrer"
            >
                <Flex
                    height="5em"
                    mHeight="1em"
                    background={sliderBackGround}
                    border={`4px solid ${sliderTitleColor}`}
                    justify="center"
                    align="center"
                    hoverable={true}
                    hoverColor={sliderHoverBackground}
                >
                    {icon}
                    <Title
                        fWeight={'600'}
                        height={'28%;'}
                        fSize={'1.3em'}
                        width="10em"
                        align="left"
                        margin=" 5px 0 0 10px"
                        color={sliderTitleColor}
                    >
                        {title}
                    </Title>
                </Flex>
            </a>
        </motion.div>
    )
}
