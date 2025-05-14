import { createContext, useState, type ReactNode } from "react";

interface IAccount {
    name: string;
    balance: string;
    agency: string;
    account: string;
    lastUpdate: string;
};

interface IAccountContextType {
    accountContext: IAccount;
    updateAccountContext: (newData: Partial<IAccount>) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AccountContext = createContext<IAccountContextType | null>(null);

const AccountProvider = ({ children }: { children: ReactNode }) => {
    const [accountContext, setAccountContext] = useState<IAccount>({
        name: "",
        balance: "",
        agency: "",
        account: "",
        lastUpdate: "",
    });

    const updateAccountContext = (newData: Partial<IAccount>) => {
        setAccountContext((prevAccountContext) => ({
            ...prevAccountContext,
            ...newData,
            lastUpdate: new Date().toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }).replace(",", " às"),
        }));
    };

    return (
        <AccountContext.Provider value={{ accountContext, updateAccountContext }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
