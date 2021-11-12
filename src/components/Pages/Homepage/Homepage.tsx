import React from 'react'
import Flex from '../../StyledComponents/Flex'
import { Redirect } from 'react-router-dom'
import LoginPage from '../Authorization/LoginPage'
import Navbar from '../Navigation/MainNavbar'

const Homepage = () => {
    return (
        <Flex width={'90%'}>
            <Redirect to={'/Aide/login'} />
        </Flex>
    )
}

export default Homepage
