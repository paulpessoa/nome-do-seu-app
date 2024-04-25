
import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Função para obter dados do servidor
export async function getServerSideProps(context) {
  // Simulação de dados do servidor (pode ser substituído por uma chamada a uma API real)
  const { id } = context.params;
  const data = await fetch(`${apiUrl}/posts/${id}`);
  const post = await data.json();

  return {
    props: {
      post,
    },
  };
}

// Componente de página dinâmica
export default function DynamicPage({ post }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/posts/${post.id}/edit`);
  };
  
  const handleVotlar = () => {
    router.push("/");
  };


  // Verificando se os dados do post ainda estão sendo carregados
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Renderizando a página com os dados do post
  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" justifyContent="space-between" p={2}>

        <Button variant="contained" color="primary" onClick={handleVotlar}>
          voltar
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          EDITAR
        </Button>
      </Stack>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Container>
  );
}
