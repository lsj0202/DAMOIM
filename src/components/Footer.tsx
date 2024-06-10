import Container from './layout/Container';
import Wrapper from './layout/Wrapper';

const Footer = () => {
  return (
    <Wrapper className="h-[60px] w-full bg-slate-100">
      <Container>
        <footer className="flex h-[60px] items-center justify-center">
          Copyright (c) DAMOIM. All rights reserved.
        </footer>
      </Container>
    </Wrapper>
  );
};

export default Footer;
