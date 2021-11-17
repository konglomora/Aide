import { Outlet, useNavigate } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import Flex from '../../StyledComponents/Flex'
import { useEffect } from 'react'

const stylesForStyledLink = {
    width: '20%',
    height: '2em',
    radius: '15px',
    text_align: 'center',
}

const ReportsNavigation = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('action-plan')
    }, [navigate])
    return (
        <Flex direction={'column'}>
            <Flex
                justify={'space-evenly'}
                bBorder={'3px solid white'}
                padding={'20px 0px 10px'}
                bColor={'rgb(24,25,26)'}
            >
                <StyledNavLink
                    to="action-plan"
                    {...stylesForStyledLink}
                    text="Action plan"
                />
                <StyledNavLink
                    to="onion-select"
                    {...stylesForStyledLink}
                    text="Camcorders"
                    width="300px"
                />
            </Flex>
            <Outlet />
        </Flex>
    )
}

export default ReportsNavigation
