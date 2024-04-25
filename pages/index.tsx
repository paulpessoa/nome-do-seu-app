import { useRouter } from 'next/router';
import PostTable from './components/PostTable';
import { Button, Container, Stack, Typography } from '@mui/material';

const Index = () => {
  const router = useRouter();

  const handleCreatePost = () => {
    router.push('/posts/create');
  };

  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" justifyContent="space-between" p={2}>
        <Typography fontSize={20} gutterBottom>Lista de Relatórios</Typography>
        <Button variant="contained" color="primary" onClick={handleCreatePost}>
          Criar Post
        </Button>
      </Stack>
      <PostTable />
    </Container>
  );
};

export default Index;
