export const adminEmails = {
    arsenii_netrebenko: 'arsenii.netrebenko@gmail.com',
    artem_levkovich: 'artem.levkovich0011@gmail.com',
}

export const managerEmails = {
    eduard_horkusha: 'eduard.horkusha@glovoapp.com',
}

export const leadEmails = {
    alina_kolomiets: 'alina.kolomiets@glovoapp.com',
    vitaliy_kresan: 'vitaliy.kresan@providers.glovoapp.com',
}

export const fleetEmails = {
    maksim_romanenko: 'maksim.romanenko@',
    alina_demyan: 'alina.demyan@providers.glovoapp.com',
    aleksey_zakharchuk: 'aleksey.zakharchuk@providers.glovoapp.com',
    mikhail_marchenko: 'Mikhail.Marchenko@globalbilgi.com',
}

export const dashEmails = {}

export enum Roles {
    admin = 'admin',
    manager = 'manager',
    lead = 'lead',
    fleet = 'fleet',
    dash = 'dash',
    guest = 'guest',
}

const getUserRole = (email: string): Roles => {
    if (Object.values(adminEmails).includes(email)) return Roles.admin
    if (Object.values(managerEmails).includes(email)) return Roles.manager
    if (Object.values(leadEmails).includes(email)) return Roles.lead
    if (Object.values(fleetEmails).includes(email)) return Roles.fleet
    if (Object.values(dashEmails).includes(email)) return Roles.dash
    return Roles.guest
}

export default getUserRole
