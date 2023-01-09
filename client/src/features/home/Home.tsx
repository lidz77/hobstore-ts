import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../../app/ROUTES";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <Container>
      <Link to={ROUTES.adminRoute()}>Go to admin dashboard</Link>
    </Container>
  );
};

export default Home;
