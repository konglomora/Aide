import { Flex } from 'components/styled'
import { FC, ReactNode } from 'react'

export interface IPropsNavbar {
    children: ReactNode
}

const Navbar: FC<IPropsNavbar> = (props) => {
    const { children } = props
    return (
        <Flex
            justify={'space-evenly'}
            align="center"
            bBorder={'3px solid white'}
            padding={'1em 0px 1em'}
            bColor={'rgb(24,25,26)'}
            height="3%"
            mHeight="3%"
            top="0"
            left="10em"
            width="100%"
            position="fixed"
            zIndex="3"
        >
            {children}
        </Flex>
    )
}

export default Navbar
