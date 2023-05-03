import { createContext, PropsWithChildren, useState } from 'react';

export const UserContext = createContext<null | string | any>(null);

export const ProviderUserContext = (props: PropsWithChildren) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }} >
            {props.children}
        </UserContext.Provider>
    )
} 