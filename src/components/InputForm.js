import { useState } from 'react';
import ShowNetSalary from './ShowNetSalary';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';

const InputForm = () => {
    const [salary, setSalary] = useState("");
    const [mensilita, setMensilita] = useState("");
    const [inps, setInps] = useState("");
    const [irpef, setIrpef] = useState("");
    const [addIrpefRegionale, setAddIrpefRegionale] = useState("");
    const [addIrpefComunale, setAddIrpefComunale] = useState("");
    const [detrazioniLavDipentente, setDetrazioniLavDipentente] = useState("");
    



    //rientro cervelli

    const [irpef1, setIrpef1] = useState("");
    const [addIrpefRegionale1, setAddIrpefRegionale1] = useState("");
    const [addIrpefComunale1, setAddIrpefComunale1] = useState("");
    const [detrazioniLavDipentente1, setDetrazioniLavDipentente1] = useState("");


    const [isShown, setIsShown] = useState(false);

    const calculateSalary = (e)=> {
        e.preventDefault()

        setInps(calculateInps())
        let imponibile = (salary - calculateInps()) 
     
        setIrpef(calculateIRPEF(imponibile))
        setAddIrpefRegionale(calculateAddIRPEFReg(imponibile))
        setAddIrpefComunale(calculateAddIRPEFOComunale(imponibile))
        setDetrazioniLavDipentente(calculateDetrazioniLavDipendente())

        //rientro cervelli


        let imponibile1 = (salary - calculateInps()) * 0.30
     
        setIrpef1(calculateIRPEF(imponibile1))
        setAddIrpefRegionale1(calculateAddIRPEFReg(imponibile1))
        setAddIrpefComunale1(calculateAddIRPEFOComunale(imponibile1))
        setDetrazioniLavDipentente1(calculateDetrazioniLavDipendente())

  
    }
    

    const calculateInps = () =>{
        let inps = salary * 9.19 /100
        return parseInt(inps)
    }


    const calculateIRPEF = (imponibile) =>
    {  
        let irpef = 0
        // thanks to http://www.lidimatematici.it/blog/2013/11/11/formula-esplicita-del-calcolo-irpef/
    
        irpef += Math.max(0,(Math.min(imponibile,15000)- 0)) * 0.23
        irpef += Math.max(0,(Math.min(imponibile,28000)- 15000)) * 0.25
        irpef += Math.max(0,(Math.min(imponibile,50000)- 28000)) * 0.35
        irpef += Math.max(0,(Math.min(imponibile,99999999999)- 50000)) * 0.43

        return parseInt(irpef)

    }


    const calculateAddIRPEFReg = (imponibile) =>
    {  
        let irpef = 0
        console.log(imponibile)
        // thanks to http://www.lidimatematici.it/blog/2013/11/11/formula-esplicita-del-calcolo-irpef/
    
        irpef += Math.max(0,(Math.min(imponibile,15000)- 0)) * 0.0123
        irpef += Math.max(0,(Math.min(imponibile,28000)- 15000)) * 0.0158
        irpef += Math.max(0,(Math.min(imponibile,50000)- 28000)) * 0.0172
        irpef += Math.max(0,(Math.min(imponibile,99999999999)- 50000)) * 0.0173

        return parseInt(irpef)
    }


    const calculateAddIRPEFOComunale = (imponibile) =>
    {  
        let inps = imponibile * 0.8 /100
        return parseInt(inps)

    }

    const calculateDetrazioniLavDipendente = () =>
    {  
        let detrazione = 0
        if (salary <15000)
            detrazione = 1880
        else if (salary>15000 && salary <28000)
            detrazione = 1910 + 1190 * [(28000 - salary) / 13000]
        else if (salary> 28000 && salary < 50000 )
            detrazione = 1910 * [(50000 - salary)/22000]
        else if (salary > 55000)
            detrazione = 0

        return parseInt(detrazione)

    }


    const handleClick = event => {
        setIsShown(true);
      };




    return ( 
        <Container>
            <Typography variant="h3" color="textSecondary" component="h1" gutterBottom>
                Calcolo Stipendio Netto
            </Typography>
                <form onSubmit={calculateSalary} >

                    <TextField id="standard-basic" required label="RAL" variant="standard" value={salary}  onChange={(e) => setSalary(e.target.value)} />
                    <TextField id="standard-basic" required label="Mensilità" sx={{'margin-left':'20px'}} value = {mensilita} variant="standard"  onChange={(e) => setMensilita(e.target.value)}></TextField>

                    <Button  onClick= {handleClick} type="submit" variant="contained" disableElevation endIcon={<SendIcon/>}  sx={{ m: 1 }} >Calcola </Button>
           
            </form>
            <Grid container spacing={4} >
                <Grid item xs="12" sx={{'margin-top':'20px'}}>
                {isShown &&  
                    <Card>
                        <ShowNetSalary salary={salary} inps={inps} irpef={irpef} addIrpefRegionale = {addIrpefRegionale} addIrpefComunale={addIrpefComunale} detrazioniLavDipentente={detrazioniLavDipentente} mensilita={mensilita}/>
        
                    </Card>   
                }
                </Grid>

                <Grid item xs="12" sx={{'margin-top':'20px'}}>
                {isShown &&
                    <Card>
                        <h2> Rientro Cervelli</h2>

                        <ShowNetSalary salary={salary} inps={inps} irpef={irpef1} addIrpefRegionale = {addIrpefRegionale1} addIrpefComunale={addIrpefComunale1} detrazioniLavDipentente={detrazioniLavDipentente1}  mensilita={mensilita}/>
                    </Card>   
                }
                </Grid>


            </Grid>
        </Container>
     );
}
 
export default InputForm;