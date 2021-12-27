export const adminEmails = {
    arsenii_netrebenko: 'arsenii.netrebenko@gmail.com',
    artem_levkovich: 'artem.levkovich0011@gmail.com',
}

export const userIsAdmin = (email: string): boolean => {
    return Object.values(adminEmails).includes(email)
}
