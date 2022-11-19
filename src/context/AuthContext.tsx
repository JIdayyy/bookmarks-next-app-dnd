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

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }): JSX.Element {
    const [user, setUser] = useState(null);
    console.log(user);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            "usePlaybackObject must be used within a PlaybackObjectProvider",
        );
    }

    return context;
};
