import { createContext, useState, type ReactNode } from "react";

interface IConta {
    name: string;
    balance: string;
    agency: string;
    account: string;
    lastUpdate: string;
};

interface IContaContextType {
    contaContext: IConta;
    updateContaContext: (newData: Partial<IConta>) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ContaContext = createContext<IContaContextType | null>(null);

const ContaProvider = ({ children }: { children: ReactNode }) => {
    const [contaContext, setContaContext] = useState<IConta>({
        name: "",
        balance: "",
        agency: "",
        account: "",
        lastUpdate: "",
    });

    const updateContaContext = (newData: Partial<IConta>) => {
        setContaContext((prevContaContext) => ({
            ...prevContaContext,
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
        <ContaContext.Provider value={{ contaContext, updateContaContext }}>
            {children}
        </ContaContext.Provider>
    );
};

export default ContaProvider;
