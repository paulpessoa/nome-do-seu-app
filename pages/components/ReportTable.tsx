// components/ReportTable.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Função para buscar todos os reports e atualizar o estado
    const fetchReports = async () => {
      try {
        // Realizar a requisição para obter todos os reports
        const response = await fetch(`${apiUrl}/reports`);
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error.message);
      }
    };

    fetchReports();
  }, []);

  const handleReportClick = (reportId) => {
    // Navegar para a página do report quando uma linha da tabela é clicada
    router.push(`/reports/${reportId}`);
  };





  const handleEdit = (reportId) => {
    router.push(`/reports/${reportId}/edit`);
  };


  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{ width: "10%" }}>ID</TableCell>
              <TableCell sx={{ width: "70%" }}>Title</TableCell>
              <TableCell sx={{ width: "10%", textAlign: "center" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow hover key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell onClick={() => handleReportClick(report.id)} style={{ cursor: 'pointer' }}>{report.title}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(report.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportTable;
