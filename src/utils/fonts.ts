import { Poppins, Ubuntu } from 'next/font/google'

export const poppins = Poppins(
    {
        subsets: ['latin'],
        weight: ['300', '400', '500']
    }
)

export const ubuntu = Ubuntu(
    {
        subsets: ['latin'],
        weight: ['500']
    }
)