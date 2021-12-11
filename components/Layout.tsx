import Head from "next/head";
import { Alert, Container, Typography } from "@mui/material";
import { Breakpoint } from "@mui/system";
import { useUser } from "../lib/firebase";

export interface LayoutProps {
  title?: string;
  children?: React.ReactNode;
  maxWidth?: Breakpoint;
}

export default function Layout({ title, children, maxWidth }: LayoutProps) {
  const [user, updateUser] = useUser();

  return (
    <>
      <Head>
        <title>Oh Hell!{title && ` - ${title}`}</title>
        <meta name="description" content="Oh Hell! - the card game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth={maxWidth ?? "lg"}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            mt={4}
            mb={2}
            color="primary"
          >
            Oh Hell!
          </Typography>
          {title && (
            <Typography
              component="h2"
              variant="h4"
              align="center"
              my={2}
              color="primary"
            >
              {title}
            </Typography>
          )}
          {children}
          {user.uid && !user.hideCookiePopup && (
            <Alert
              severity="info"
              onClose={() => updateUser({ ...user, hideCookiePopup: true })}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                m: 2,
                boxShadow: 1,
              }}
            >
              This page uses cookies.
            </Alert>
          )}
        </Container>
      </main>
    </>
  );
}
