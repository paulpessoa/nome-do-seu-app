
import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Função para obter dados do servidor
export async function getServerSideProps(context) {
  // Simulação de dados do servidor (pode ser substituído por uma chamada a uma API real)
  const { id } = context.params;
  const data = await fetch(`${apiUrl}/reports/${id}`);
  const report = await data.json();

  return {
    props: {
      report,
    },
  };
}

// Componente de página dinâmica
export default function DynamicPage({ report }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/reports/${report.id}/edit`);
  };

  const handleVotlar = () => {
    router.push("/");
  };


  // Verificando se os dados do report ainda estão sendo carregados
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Renderizando a página com os dados do report
  return (
    <Container maxWidth="md">
      <Stack flexDirection="row" justifyContent="space-between" p={2}>

        <Button variant="contained" color="primary" size="small" onClick={handleVotlar}>
          Voltar
        </Button>
        <Typography fontSize={20} gutterBottom>
          {report.title}
        </Typography>
        <Button variant="contained" color="primary" size="small" onClick={handleEdit}>
          Editar
        </Button>
      </Stack>

      <div dangerouslySetInnerHTML={{ __html: report.content }} />
    </Container>
  );
}
