import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import ReportForm from '../components/ReportForm';

const CreateReportPage: React.FC = () => {
  
  return (
    <Container maxWidth="md">
       <Stack flexDirection="row" justifyContent="space-between" mb={2}>
        <Typography fontSize={20} gutterBottom>
          Criar relatório
        </Typography>
      </Stack>
      <ReportForm />
    </Container>
  );
};

export default CreateReportPage;
