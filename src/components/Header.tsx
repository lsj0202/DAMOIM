import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Container from './layout/Container';
import Wrapper from './layout/Wrapper';

const Header = () => {
  const router = useRouter();

  return (
    <Wrapper className="fixed z-50 bg-white shadow-md transition ease-in-out">
      <Container>
        <header className="flex h-[60px] items-center justify-between">
          <Image
            src="/imgs/logo.svg"
            alt="logo"
            width={150}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <div className="cursor-pointer">로그인</div>
        </header>
      </Container>
    </Wrapper>
  );
};

export default Header;
