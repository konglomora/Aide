import React, { MouseEventHandler, ReactElement, useState } from 'react'

export const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    return (
        <>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleClick}>{title}</button>
        </>
    )
}
