import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type User = {
    id: string;
    email: string;
    name: string;
    picture: string;
};

interface AuthContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

type ChildrenProp = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: ChildrenProp): JSX.Element {
    const [user, setUser] = useState<User>({
        id: "",
        email: "",
        name: "",
        picture: "",
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContext => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error("Context must be used within a Provider");
    }

    return context;
};
