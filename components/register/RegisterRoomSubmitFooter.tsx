import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg';
import { useSelector } from '../../store';
import Button from '../common/Button';
import palette from '../../styles/palette';
import { registerRoomAPI } from '../../lib/api/room';

const RegisterRoomSubmitFooter: React.FC = () => {
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  const router = useRouter();

  const onClickRegisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };
    try {
      await registerRoomAPI(registerRoomBody);

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Link href="/room/register/date">
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button onClick={onClickRegisterRoom} color="bittersweet" width="102px">
        등록하기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 548px;
  height: 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 30px 20px;
  background-color: #ffffff;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};
  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

export default RegisterRoomSubmitFooter;
