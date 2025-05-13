import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconRetangle from '../assets/IconRetangle.svg'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ContaContext } from '../contexts/ContaContext';

export default function SaldoComponent({ visibleAccont = true }) {
    const context = useContext(ContaContext);
    if (!context) {
        throw new Error("SaldoComponent deve ser usado dentro de um ContaProvider");
    }
    const { contaContext } = context;
    const [visible, setVisible] = useState(true)
    return (
        <Card sx={{ width: 333, borderRadius: 5, mt: 5 }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography gutterBottom sx={{ color: '#657A95', fontSize: 16, fontWeight: 600 }}>
                        Saldo em conta
                    </Typography>
                    {visible ? (
                        <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={() => setVisible(!visible)} />

                    ) : (
                        <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => setVisible(!visible)} />
                    )}

                </Box>

                {visible ? (
                    <Typography sx={{ fontSize: 29, fontWeight: 700 }}>
                        R$ {contaContext.balance}
                    </Typography>
                ) : (
                    <img src={IconRetangle}></img>
                )}


                <Typography sx={{ color: '#657A95', fontSize: 12, fontWeight: 400 }}>
                    Atualizado em {contaContext.lastUpdate}
                </Typography>

                {(visible && visibleAccont) && (
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                        <Box>
                            <Typography sx={{ color: '#657A95', fontSize: 12, fontWeight: 400 }}>
                                Agência
                            </Typography>
                            <Typography sx={{ color: '#657A95', fontSize: 16, fontWeight: 700 }}>
                                {contaContext.agency}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ color: '#657A95', fontSize: 12, fontWeight: 400 }}>
                                Conta
                            </Typography>
                            <Typography sx={{ color: '#657A95', fontSize: 16, fontWeight: 700 }}>
                                {contaContext.account}
                            </Typography>
                        </Box>
                    </Box>
                )}

            </CardContent>
        </Card>
    )

}