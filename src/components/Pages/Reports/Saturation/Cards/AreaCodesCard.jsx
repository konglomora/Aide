import { Flex } from '../../../../StyledComponents/Flex'
import TextContent from '../../../../StyledComponents/TextContent'
import React from 'react'
import OnionCode from './OnionCodeCard'

const AreaCodesCard = ({ cardTitle, codes, onClick }) => {
    return (
        <Flex
            direction={'column'}
            width={`80%`}
            bRadius={'5px'}
            margin={'8px auto'}
            padding={'10px'}
        >
            <TextContent width={' '} textAlign={'center'}>
                {cardTitle}
            </TextContent>
            <Flex justify={'center'} wrap={'wrap'}>
                {codes.map((code) => (
                    <OnionCode key={code} code={code} onClick={onClick} />
                ))}
            </Flex>
        </Flex>
    )
}

export default AreaCodesCard
