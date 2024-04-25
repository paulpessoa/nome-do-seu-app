import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import PostForm from '../components/PostForm';
import { useRouter } from 'next/router';

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const handleVoltar = () => {
    router.push('/');
  };


  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" justifyContent="space-between" p={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Criar Novo Post
        </Typography>
        <Button variant="contained" color="primary" onClick={handleVoltar}>
          Voltar
        </Button>
      </Stack>
      <PostForm />
    </Container>
  );
};

export default CreatePostPage;
