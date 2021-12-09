import { Container } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import Layout from "../../components/Layout";

export default function Room() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout title={`Room ${name}`}>
      <Container maxWidth="lg"></Container>
    </Layout>
  );
}
