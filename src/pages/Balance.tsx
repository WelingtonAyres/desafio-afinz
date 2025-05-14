import { useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BalanceComponent from '../components/BalanceComponent';
import { AccountContext } from '../contexts/AccountContext';
import { formatAccount, formatCurrency } from '../utils/formatters';
import apiClient from "../services/api";

export default function Balance() {
    const context = useContext(AccountContext);

    if (!context) {
        throw new Error("SaldoComponent deve ser usado dentro de um AccountProvider");
    }

    const { accountContext, updateAccountContext } = context

    useEffect(() => {
        getProfile()
        getBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProfile = async () => {
        try {
            const response = await apiClient.get("/profile");
            updateAccountContext({ ...response.data, account: formatAccount(response.data.account.toString()) })
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    };

    const getBalance = async () => {
        try {
            const response = await apiClient.get("/balance");
            updateAccountContext({ balance: formatCurrency(response.data.balance.toString()) })
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    };

    return (
        <Box sx={{
            backgroundColor: '#EDEDED',
            flexGrow: 1,
            width: '100%',
            pl: 5,
            pt: 5
        }}>
            <Typography variant="h5">Bom dia, {accountContext?.name} </Typography>
            <Typography variant="subtitle1" color='#B5B5B5'>Veja como anda a saúde da sua conta bancária</Typography>
            <BalanceComponent />
        </Box>
    );
};
