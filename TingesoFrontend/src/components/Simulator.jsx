import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

const Simulator = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [termYears, setTermYears] = useState('');
    const [propertyValue, setPropertyValue] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanType, setLoanType] = useState('');

    const handlePositiveValue = (value) => value >= 0 ? value : '';

    const calculateMonthlyPayment = (event) => {
        event.preventDefault();

        const P = parseFloat(amount);
        const r = (parseFloat(interestRate) / 100);
        let n = parseInt(termYears) * 12;
        const pValue = parseInt(propertyValue);
        const loanTypeValue = parseInt(loanType);
        let maxAmount;



        if (r === 0) {
            setMonthlyPayment(P / n);
            return;
        }

        if (loanTypeValue === 1) {
            maxAmount = pValue * 0.8;
            if (termYears > 30) {
                alert('The maximum term for a first home loan is 30 years');
                return;
            } else if (r < 0.025 || r > 0.05) {
                alert('The interest rate for a first home loan should be between 2.5% and 5.0%');
                return;
            } else if (P > maxAmount) {
                alert('The maximum amount for a first home loan is 80% of the value of the property');
                return;
            } else {
                n = n / 12;
                const M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
                setMonthlyPayment(M);
            }
        } else if (loanTypeValue === 2) {
            maxAmount = pValue * 0.7;
            if (termYears > 20) {
                alert('The maximum term for a second home loan is 20 years');
                return;
            } else if (r < 0.04 || r > 0.06) {
                alert('The interest rate for a second home loan should be between 4.0% and 6.0%');
                return;
            } else if (P > maxAmount) {
                alert('The maximum amount for a second home loan is 70% of the value of the property');
                return;
            } else {
                n = n / 12;
                const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                setMonthlyPayment(M);
            }
        } else if (loanTypeValue === 3) {
            maxAmount = pValue * 0.6;
            if (termYears > 25) {
                alert('The maximum term for a commercial property loan is 25 years');
                return;
            } else if (r < 0.05 || r > 0.07) {
                alert('The interest rate for a commercial property loan should be between 5.0% and 7.0%');
                return;
            } else if (P > maxAmount) {
                alert('The maximum amount for a commercial property loan is 60% of the value of the property');
                return;
            } else {
                n = n / 12;
                const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                setMonthlyPayment(M);
            }
        } else if (loanTypeValue === 4) {
            maxAmount = pValue * 0.5;
            if (termYears > 15) {
                alert('The maximum term for a remodeling loan is 15 years');
                return;
            } else if (r < 0.045 || r > 0.06) {
                alert('The interest rate for a remodeling loan should be between 4.5% and 6.0%');
                return;
            } else if (P > maxAmount) {
                alert('The maximum amount for a remodeling loan is 50% of the value of the property');
                return;
            } else {
                n = n / 12;
                const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                setMonthlyPayment(M);
            }
        }
    };

    return (
        <Box className="Box-form">
            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Mortgage Credit Simulator
            </Typography>
            <form onSubmit={calculateMonthlyPayment}>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Property Value"
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Loan Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Annual Interest Rate (%)"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Term (Years)"
                        type="number"
                        value={termYears}
                        onChange={(e) => setTermYears(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Loan Type</InputLabel>
                    <Select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="1">First home loan</MenuItem>
                        <MenuItem value="2">Second home loan</MenuItem>
                        <MenuItem value="3">Commercial properties loan</MenuItem>
                        <MenuItem value="4">Remodeling loan</MenuItem>
                    </Select>
                </FormControl>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#2d53ff" }}
                startIcon={<SendIcon />}
                >
                    Calculate Monthly Fee
                </Button>
            </form>

            {monthlyPayment !== null && (
                <Box marginTop="20px" textAlign="center">
                    <Typography variant="h5" color="textSecondary">
                        Monthly Fee: ${monthlyPayment.toFixed(0)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Simulator;
