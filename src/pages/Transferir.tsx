import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Drawer from '@mui/material/Drawer';
import SaldoComponent from '../components/SaldoComponent';
import * as yup from 'yup';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { formatAccount, formatCurrency } from '../utils/formatters';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ContaContext } from '../contexts/ContaContext';
import apiClient from "../services/api";
import moment from "moment";
import { AxiosError } from 'axios'; // Importar AxiosError

interface IErrorMessage {
    title: string;
    message: string;
}

export default function Transferir() {
    const [agencia, setAgencia] = useState("")
    const [conta, setConta] = useState("")
    const [valor, setValor] = useState("0,00")
    const [errors, setErrors] = useState<{ agencia?: string; conta?: string; valor?: string }>({});
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [dialogErrorOpen, setDialogErrorOpen] = useState(false)
    const [messageError, setMessageError] = useState<IErrorMessage>({
        title: "",
        message: ""
    })
    const [status, setStatus] = useState("")
    const [dataHora, setDataHora] = useState("")
    const [agenciaReceipt, setAgenciaReceipt] = useState("")
    const [contaRreceipt, setContaReceipt] = useState("")
    const [valorReceipt, setValorReceipt] = useState("")

    const context = useContext(ContaContext);

    if (!context) {
        throw new Error("SaldoComponent deve ser usado dentro de um ContaProvider");
    }

    const { contaContext, updateContaContext } = context

    const validationSchema = yup.object({
        agencia: yup
            .string()
            .required('Agência é obrigatória'),
        conta: yup
            .string()
            .required('Conta é obrigatória'),
        valor: yup
            .number()
            .transform((_value, originalValue) => String(originalValue).includes(',') ? parseFloat(String(originalValue).replace('.', '').replace(',', '.')) : parseFloat(String(originalValue)))
            .typeError('Valor deve ser um número')
            .positive('Valor deve ser maior que 0')
            .required('Valor é obrigatório'),
    });

    const consultAgencyAccount = async () => {
        const agenciaNumber = Number(agencia.replace(/\D/g, ""))
        const contaNumber = Number(conta.replace(/\D/g, ""))
        try {
            await apiClient.get(`/consult-agency-account/${agenciaNumber}/${contaNumber}`);
            return true;
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            setMessageError({
                title: 'Algo deu errado!',
                message: axiosError.response?.data?.message || 'Aconteceu um erro inesperado.'
            })
            setDialogErrorOpen(true)
            return false;
        }
    }

    const transferValue = async () => {
        const valorNumber = Number(valor.replace(/\D/g, ""))
        const agenciaNumber = Number(agencia.replace(/\D/g, ""))
        const contaNumber = Number(conta.replace(/\D/g, ""))
        try {
            const response = await apiClient.post("/transfer", {
                value: valorNumber,
                agency: agenciaNumber,
                account: contaNumber
            });
            dataFormatada(response.data.dateTime)
            setStatus(response.data.status)
            const currentValueAccount = Number(contaContext.balance.replace(/\D/g, "")) - valorNumber
            updateContaContext({ balance: formatCurrency(currentValueAccount.toString()) })
            setAgenciaReceipt(agencia)
            setContaReceipt(conta)
            setValorReceipt(valor)
            return true;
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            setMessageError({
                title: 'Algo deu errado!',
                message: axiosError.response?.data?.message || 'Aconteceu um erro inesperado.'
            })
            setDialogErrorOpen(true)
            return false;
        }
    }

    const transfer = async () => {
        let sendValue = 0
        let currentValue = 0

        sendValue = Number(valor.replace(/\D/g, ""))
        currentValue = Number(contaContext.balance.replace(/\D/g, ""))

        if (sendValue > currentValue) {
            setMessageError({
                title: 'Saldo Insuficiente',
                message: 'Sua tentativa de transação não foi concluída devido a saldo insuficiente em sua conta. Por favor, verifique seu saldo e tente novamente.'
            })
            setDialogErrorOpen(true)
            return
        }

        const consultAgencyAccountBoolean = await consultAgencyAccount()
        if (!consultAgencyAccountBoolean) {
            return;
        }

        const transferValueBoolean = await transferValue()
        if (!transferValueBoolean) {
            return;
        }
        setAgencia("")
        setConta("")
        setValor("0,00")
        setDrawerOpen(true)
    }



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});
        try {
            await validationSchema.validate({ agencia, conta, valor }, { abortEarly: false });
            await transfer()

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors: { agencia?: string; conta?: string; valor?: string } = {};
                err.inner.forEach(error => {
                    if (error.path) {
                        newErrors[error.path as keyof typeof newErrors] = error.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    }

    const dataFormatada = (milissegundos: number) => {
        const timestamp = milissegundos;
        const dataFormatada = moment(timestamp).utc().format("DD/MM/YYYY - HH:mm");
        setDataHora(dataFormatada)
    };

    return (
        <Box sx={{
            backgroundColor: '#EDEDED',
            flexGrow: 1,
            width: '100%',
            pl: 5,
            pt: 5
        }}>
            <Typography variant="h5">Área de transferência</Typography>
            <Typography variant="subtitle1" color='#B5B5B5'>Preencha os dados para realizar sua transferência entre contas</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                    <Card sx={{ minWidth: 275, maxWidth: 474, borderRadius: 5, marginTop: 5 }}>
                        <CardHeader
                            sx={{ backgroundColor: '#EDEDED' }}
                            title={
                                <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 400 }}>
                                    Dados da transferência
                                </Typography>
                            }
                        />
                        <CardContent sx={{ pl: 3, pr: 3 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <Typography sx={{ color: '#657A95', fontSize: 16, fontWeight: 400 }}>Tipo de transferência</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                value={"TED (Transferência entre contas)"}
                                                disabled
                                                size='small'
                                            >
                                                <MenuItem value={'TED (Transferência entre contas)'}>TED (Transferência entre contas)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography sx={{ color: '#657A95', fontSize: 16, fontWeight: 400 }}>Agência</Typography>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            value={agencia}
                                            onChange={(e) => {
                                                const valor = e.target.value;
                                                if (valor === "" || /^\d+$/.test(valor)) {
                                                    setAgencia(valor);
                                                }
                                            }}
                                            error={!!errors.agencia}
                                            helperText={errors.agencia}
                                        />
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography sx={{ color: '#657A95', fontSize: 16, fontWeight: 400 }}>Conta</Typography>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            value={conta}
                                            onChange={(e) => {
                                                setConta(formatAccount(e.target.value))
                                            }}
                                            error={!!errors.conta}
                                            helperText={errors.conta}
                                        />
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography sx={{ color: '#657A95', fontSize: 16, fontWeight: 400 }}>Valor</Typography>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            value={valor}
                                            onChange={(e) => {
                                                setValor(formatCurrency(e.target.value))
                                            }}
                                            error={!!errors.valor}
                                            helperText={errors.valor}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', pr: 3, pb: 3 }}>
                            <Button type='submit' size="small" sx={{ bgcolor: '#00C5CB', pl: 3, pr: 3, textTransform: 'none', fontSize: 16, fontWeight: 400 }} variant="contained">Transferir</Button>
                        </CardActions>
                    </Card>
                </form>
                <Box sx={{ ml: 6 }}>
                    <SaldoComponent visibleAccont={false} />
                </Box>
            </Box>
            <Drawer
                anchor={'right'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}>
                <Box>
                    <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', padding: '4px' }}>
                        <HighlightOffIcon sx={{ color: 'black' }} />
                    </Button>
                </Box>
                <Box sx={{ width: 412, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', p: 3 }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 400 }}>Novo Saldo</Typography>
                    <Typography sx={{ color: '#333333', fontSize: 24, fontWeight: 700 }}>R$ {contaContext.balance}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>Status</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>{status}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>Data - Hora</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>{dataHora}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>Agência</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>{agenciaReceipt}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>Conta</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>{contaRreceipt}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 3 }}>Valor</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>R$ {valorReceipt}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>Sua conta</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>{contaContext.account}</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 1 }}>Sua agência</Typography>
                    <Typography sx={{ color: '#B5B5B5', fontSize: 16, fontWeight: 400 }}>{contaContext.agency}</Typography>
                </Box>
            </Drawer>

            <Dialog
                open={dialogErrorOpen}
                onClose={() => setDialogErrorOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', p: 1 }}>
                    <ErrorOutlineIcon sx={{ color: 'red', fontSize: 100 }} />
                </Box>
                <DialogTitle align='center'>
                    {messageError.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText align='center'>
                        {messageError.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button variant="contained" color="error" onClick={() => setDialogErrorOpen(false)}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
