import { createContext, PropsWithChildren, useState } from 'react';
import { IUser } from '../types/Users';

export const UserContext = createContext<null | string | any>(null);

export const ProviderUserContext = (props: PropsWithChildren) => {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }} >
            {props.children}
        </UserContext.Provider>
    )
} 