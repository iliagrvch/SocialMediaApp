import AuthForm from "../components/auth/AuthForm";
import { Card } from "@mui/material";
import PageContent from "../components/UI/PageContent";
const AuthPage = () => {
  return (
    <PageContent centered={true}>
      <Card>
        <AuthForm></AuthForm>
      </Card>
    </PageContent>
  );
};

export default AuthPage;
