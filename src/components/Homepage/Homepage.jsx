import React from 'react'
import Flex from '../StyledComponents/Flex'
import Button from '../StyledComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../toolKitRedux/toolKitReducer'

const Homepage = () => {
    const dispatch = useDispatch()
    const count = useSelector((state) => state.toolkit.count)
    // const todos = useSelector(state => state.toolkit.todos)

    return (
        <Flex>
            <div>{count}</div>
            <Button onClick={() => dispatch(increment())}>Инкремент</Button>
            <Button onClick={() => dispatch(decrement())}>Декремент</Button>
            {/*<Button onClick={() => dispatch(addTodoAction(prompt()))}>Добавить туду</Button>*/}
            {/*<Button onClick={() => dispatch(removeLastTodoAction())}>Удалить последний туду</Button>*/}
            {/*{todos.map(todo => <div>{todo}</div>)}*/}
        </Flex>
    )
}

export default Homepage
