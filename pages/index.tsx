import { useRouter } from 'next/router';
import ReportTable from './components/ReportTable';
import { Button, Container, Stack, Typography } from '@mui/material';

const Index = () => {
  const router = useRouter();

  const handleCreateReport = () => {
    router.push('/reports/create');
  };

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between" mb={2}>
        <Typography fontSize={20} gutterBottom>Meus Relatórios</Typography>
        <Button variant="contained" color="primary" size="small" onClick={handleCreateReport}>
          Criar Relatório
        </Button>
      </Stack>
      <ReportTable />
    </>
  );
};

export default Index;
