import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/them';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Transactions } from './types';
import { formatMonth } from './utils/formatting';
import UserAuth from './pages/userAuth/UserAuth';

function App() {
  console.log('ユーザー情報', auth.currentUser);
  // FireStoreエラーかどうかを判別する関数
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
  }
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fecheTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Transactions'));
        // console.log(querySnapshot);
        const TransactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transactions;
        });

        console.log(TransactionsData);
        setTransactions(TransactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          // console.error(JSON.stringify(err, null, 2));
          console.error('firestoreのエラーは：', err);
          // console.error('firestoreのエラーメッセージは：', err.message);
          // console.error('firestoreのエラーはコード：', err.code);
        } else {
          console.error('一般的なエラーは：', err);
        }
      }
    };

    fecheTransactions();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/userAuth' element={<UserAuth />} />
          <Route path='/' element={<AppLayout />}>
            <Route
              index
              element={<Home monthlyTransactions={monthlyTransactions} />}
            />
            <Route path='/report' element={<Report />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
