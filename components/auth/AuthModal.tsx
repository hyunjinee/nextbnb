import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { useSelector, RootState } from '../../store';

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <div style={{ zIndex: 100 }}>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && (
        <LoginModal closeModal={closeModal}>로그인</LoginModal>
      )}
    </div>
  );
};

export default AuthModal;
