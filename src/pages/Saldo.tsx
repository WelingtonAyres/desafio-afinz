import { useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SaldoComponent from '../components/SaldoComponent';
import { ContaContext } from '../contexts/ContaContext';
import { formatAccount, formatCurrency } from '../utils/formatters';
import apiClient from "../services/api";

export default function Saldo() {
    const context = useContext(ContaContext);

    if (!context) {
        throw new Error("SaldoComponent deve ser usado dentro de um ContaProvider");
    }

    const { contaContext, updateContaContext } = context

    useEffect(() => {
        getProfile()
        getBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProfile = async () => {
        try {
            const response = await apiClient.get("/profile");
            updateContaContext({ ...response.data, account: formatAccount(response.data.account.toString()) })
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    };

    const getBalance = async () => {
        try {
            const response = await apiClient.get("/balance");
            updateContaContext({ balance: formatCurrency(response.data.balance.toString()) })
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
            <Typography variant="h5">Bom dia, {contaContext?.name} </Typography>
            <Typography variant="subtitle1" color='#B5B5B5'>Veja como anda a saúde da sua conta bancária</Typography>
            <SaldoComponent />
        </Box>
    );
};
