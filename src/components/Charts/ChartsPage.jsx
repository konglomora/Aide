import React from 'react'
import ChartOfBigOnions from './ChartOfBigOnions'
import ChartOfSmallOnions from './ChartOfSmallOnions'
import Flex from '../StyledComponents/Flex'

const ChartsPage = () => {
    return (
        <Flex width={'90%'}>
            Charts page
            <ChartOfBigOnions />
            <ChartOfSmallOnions />
        </Flex>
    )
}

export default ChartsPage
