import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { spacing } from '@mui/system';



const ShowNetSalary = (props) => {
    const salary = props.salary
    const inps = props.inps
    const irpef = props.irpef
    const addIrpefRegionale = props.addIrpefRegionale
    const addIrpefComunale = props.addIrpefComunale
    const detrazioniLavDipentente = props.detrazioniLavDipentente
    const mensilita = props.mensilita
    const irpef_netta = (irpef+ addIrpefRegionale + addIrpefComunale) - detrazioniLavDipentente
    const stipendio_netto =  salary - inps - parseInt(irpef_netta)

    return ( 
        <Box >
            <Box sx={{ textAlign: 'justify', 'padding-left':'20px','padding-top':'20px'}}>
                <Typography variant="body"> RAL: {salary} </Typography> <br/>
                <Typography variant="body"> Inps: {inps} </Typography> <br/>
                <Typography variant="body"> Irpef: {irpef} </Typography> <br/>
                <Typography variant="body"> Addizionale Regionale Irpef:{addIrpefRegionale} </Typography> <br/>
                <Typography variant="body"> Addizionale Comunale Irpef:{addIrpefComunale}</Typography> <br/>
                <Typography variant="body"> Detrazioni Lavoro dipendente: {detrazioniLavDipentente}</Typography> <br/>
                <Typography variant="body" sx={{ fontWeight: 'bold' }} > RAL Netta : {stipendio_netto}</Typography> <br/>
            </Box>

            <h3> Stipendio Netto Mensile  { parseInt(stipendio_netto / mensilita) }</h3>
     
        </Box>
    );
}
 
export default ShowNetSalary;