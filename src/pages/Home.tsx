import { Box } from '@mui/material';
import React from 'react';
import MonthlySummary from '../components/MonthlySummary';
import Calendar from '../components/Calendar';
import TransactionForm from '../components/TransactionForm';
import TransactionMenu from '../components/TransactionMenu';
import { Transactions } from '../types';

interface HomeProps {
  monthlyTransactions: Transactions[];
}

const Home = ({ monthlyTransactions }: HomeProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側コンポーネント */}
      <Box sx={{ flexGrow: 1, bgcolor: 'pink' }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar />
      </Box>

      {/* 右側コンポーネント */}
      <Box>
        <TransactionForm />
        <TransactionMenu />
      </Box>
    </Box>
  );
};

export default Home;
