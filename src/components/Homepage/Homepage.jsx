import React from 'react';
import Flex from "../StyledComponents/Flex";
import Button from "../StyledComponents/Button";
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "../../redux/reducers/customerReducer";
import {fetchCustomers} from "../../redux/asyncActions/customers";

const Homepage = () => {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cashReducer.cash)
    const customers = useSelector(state => state.customerReducer.customers)

    const addCash = (cash) => {
        dispatch({type: 'ADD_CASH', payload: cash})
    }

    const getCash = (cash) => {
        dispatch({type: 'GET_CASH', payload: cash})
    }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now(),
        }
        dispatch(addCustomerAction(customer))
    }

    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id))
    }

    return (
        <Flex>
            <div>{cash}</div>
            <Button onClick={() => addCash(Number(prompt()))}>Пополнить счет</Button>
            <Button onClick={() => getCash(Number(prompt()))}>Снять со счета</Button>
            <Button onClick={() => addCustomer(prompt())}>Добавить клиента</Button>
            <Button onClick={() => getCash(Number(prompt()))}>Удалить клиента</Button>
            <Button onClick={() => dispatch(fetchCustomers())}>Получить много клиентов</Button>

            <div>{customers.length > 0 ?
                <div>
                    {customers.map(customer =>
                        <div onClick={() => removeCustomer(customer)}>
                            {customer.name}
                        </div>
                    )}
                </div>
                :
                <div>Клиентов нет 😞</div>
            }</div>
        </Flex>
    )
}

export default Homepage