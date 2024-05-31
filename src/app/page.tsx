import { Container, Header } from '@/components';

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center bg-gradient-to-r-orange pt-[60px]">
        <Container className="flex h-[80vh]">
          <div></div>
          <div></div>
        </Container>
      </div>
    </>
  );
};

export default Home;
