import { useOverlay } from '@toss/use-overlay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginModal from './Login/LoginModal';
import SignUpModal from './SignUp/SignUpModal';
import { Flex, Text } from './common';
import Container from './layout/Container';
import Wrapper from './layout/Wrapper';

const Header = () => {
  const router = useRouter();
  const overlay = useOverlay();

  const handleSignInModal = () => {
    overlay.open(({ isOpen, close }) => (
      <LoginModal isOpen={isOpen} close={close} />
    ));
  };

  const handleSignUpModal = () => {
    overlay.open(({ isOpen, close }) => (
      <SignUpModal isOpen={isOpen} close={close} />
    ));
  };

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
          <Flex gap={20}>
            <Text className="cursor-pointer" onClick={handleSignUpModal}>
              회원가입
            </Text>
            <Text className="cursor-pointer" onClick={handleSignInModal}>
              로그인
            </Text>
          </Flex>
        </header>
      </Container>
    </Wrapper>
  );
};

export default Header;
