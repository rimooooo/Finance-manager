// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { createTheme } from '@mui/material/styles';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import { Crud, DataSourceCache } from '@toolpad/core/Crud';
// import { useDemoRouter } from '@toolpad/core/internal';

// // Sample Transaction Data Store
// let transactionsStore = [
//   { id: 1, description: 'Grocery Shopping', amount: 50.0, type: 'Expense' },
//   { id: 2, description: 'Salary', amount: 2000.0, type: 'Income' },
// ];

// // Define the Transactions Data Source
// export const transactionsDataSource = {
//   fields: [
//     { field: 'id', headerName: 'ID' },
//     { field: 'description', headerName: 'Description', flex: 1 },
//     { field: 'amount', headerName: 'Amount', type: 'number', flex: 1 },
//     { field: 'type', headerName: 'Type', flex: 1 },
//   ],

//   getMany: ({ paginationModel, filterModel, sortModel }) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         let processedTransactions = [...transactionsStore];

//         // Apply Filters
//         if (filterModel?.items?.length) {
//           filterModel.items.forEach(({ field, value, operator }) => {
//             if (!field || value == null) return;

//             processedTransactions = processedTransactions.filter((transaction) => {
//               const transactionValue = transaction[field];

//               switch (operator) {
//                 case 'contains':
//                   return String(transactionValue).toLowerCase().includes(String(value).toLowerCase());
//                 case 'equals':
//                   return transactionValue === value;
//                 case 'startsWith':
//                   return String(transactionValue).toLowerCase().startsWith(String(value).toLowerCase());
//                 case 'endsWith':
//                   return String(transactionValue).toLowerCase().endsWith(String(value).toLowerCase());
//                 case '>':
//                   return transactionValue > value;
//                 case '<':
//                   return transactionValue < value;
//                 default:
//                   return true;
//               }
//             });
//           });
//         }

//         // Apply Sorting
//         if (sortModel?.length) {
//           processedTransactions.sort((a, b) => {
//             for (const { field, sort } of sortModel) {
//               if (a[field] < b[field]) return sort === 'asc' ? -1 : 1;
//               if (a[field] > b[field]) return sort === 'asc' ? 1 : -1;
//             }
//             return 0;
//           });
//         }

//         // Apply Pagination
//         const start = paginationModel.page * paginationModel.pageSize;
//         const end = start + paginationModel.pageSize;
//         const paginatedTransactions = processedTransactions.slice(start, end);

//         resolve({
//           items: paginatedTransactions,
//           itemCount: processedTransactions.length,
//         });
//       }, 750);
//     });
//   },

//   getOne: (transactionId) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const transaction = transactionsStore.find((t) => t.id === Number(transactionId));
//         transaction ? resolve(transaction) : reject(new Error('Transaction not found'));
//       }, 750);
//     });
//   },

//   createOne: (data) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const newTransaction = { id: transactionsStore.length + 1, ...data };
//         transactionsStore = [...transactionsStore, newTransaction];
//         resolve(newTransaction);
//       }, 750);
//     });
//   },

//   updateOne: (transactionId, data) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         let updatedTransaction = null;
//         transactionsStore = transactionsStore.map((transaction) => {
//           if (transaction.id === Number(transactionId)) {
//             updatedTransaction = { ...transaction, ...data };
//             return updatedTransaction;
//           }
//           return transaction;
//         });

//         updatedTransaction ? resolve(updatedTransaction) : reject(new Error('Transaction not found'));
//       }, 750);
//     });
//   },

//   deleteOne: (transactionId) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         transactionsStore = transactionsStore.filter((transaction) => transaction.id !== Number(transactionId));
//         resolve();
//       }, 750);
//     });
//   },

//   validate: (formValues) => {
//     let issues = [];

//     if (!formValues.description) {
//       issues.push({ message: 'Description is required', path: ['description'] });
//     }
//     if (!formValues.amount || formValues.amount <= 0) {
//       issues.push({ message: 'Amount must be greater than zero', path: ['amount'] });
//     }
//     if (!formValues.type || !['Income', 'Expense'].includes(formValues.type)) {
//       issues.push({ message: 'Type must be either Income or Expense', path: ['type'] });
//     }

//     return { issues };
//   },
// };

// const transactionsCache = new DataSourceCache();

// // Utility function for path matching
// function matchPath(pattern, pathname) {
//   const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '([^/]+)')}$`);
//   const match = pathname.match(regex);
//   return match ? match[1] : null;
// }

// // Transactions Component
// function Transactions(props) {
//   const { window } = props;
//   const router = useDemoRouter('/transactions');
//   const demoWindow = window !== undefined ? window() : undefined;

//   // Define the Page Title Based on Route
//   const title = React.useMemo(() => {
//     if (router.pathname === '/transactions/new') return 'New Transaction';
//     const editTransactionId = matchPath('/transactions/:transactionId/edit', router.pathname);
//     if (editTransactionId) return `Transaction ${editTransactionId} - Edit`;
//     const showTransactionId = matchPath('/transactions/:transactionId', router.pathname);
//     if (showTransactionId) return `Transaction ${showTransactionId}`;
//     return 'Transactions';
//   }, [router.pathname]);

//   return (
//     <AppProvider
//       router={router}
//       theme={createTheme()}
//       window={demoWindow}
//     >
//       <DashboardLayout>
//         <PageContainer title={title}>
//           <Crud
//             dataSource={transactionsDataSource}
//             dataSourceCache={transactionsCache}
//             rootPath="/transactions"
//             initialPageSize={10}
//             defaultValues={{ description: '', amount: 0, type: 'Expense' }}
//           />
//         </PageContainer>
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// Transactions.propTypes = {
//   window: PropTypes.func,
// };

// export default Transactions;

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 150 },
  { id: "type", label: "Type", minWidth: 100, align: "right" },
  { id: "amount", label: "Transaction Amount", minWidth: 170, align: "right" },
  { id: "category", label: "Category", minWidth: 150, align: "right" },
  { id: "paymentMethod", label: "Payment Method", minWidth: 170, align: "right" },
];

function createTransaction(id, date, type, amount, category, paymentMethod) {
  return { id, date, type, amount, category, paymentMethod };
}

const rows = [
  createTransaction(1, "2025-03-15", "Expense", 1500, "Groceries", "UPI"),
  createTransaction(2, "2025-03-14", "Income", 50000, "Salary", "Bank Transfer"),
  createTransaction(3, "2025-03-13", "Expense", 3000, "Electricity Bill", "Credit Card"),
  createTransaction(4, "2025-03-12", "Expense", 1000, "Transport", "Cash"),
  createTransaction(5, "2025-03-11", "Income", 2000, "Freelance", "PayPal"),
];

export default function Transactions() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


