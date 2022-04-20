import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Input from '../common/Input';
import Button from '../common/Button';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import useValidateMode from '../../hooks/useValidateMode';
import { dayList, monthList, yearList } from '../../lib/staticData';
import { signupAPI } from '../../lib/api/auth';
import { userActions } from '../../store/user';
import PasswordWarning from './PasswordWarning';
import { authActions } from '../../store/auth';

interface IProps {
  closeModal: () => void;
}

const PASSWORD_MIN_LENGTH = 8;
//* 선택할 수 없는 월 option
const disabledMoths = ['월'];
//* 선택할 수 없는 일 option
const disabledDays = ['일'];
//* 선택할 수 없는 년 option
const disabledYears = ['년'];

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();

  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  //* 비밀번호 인풋 포커스 되었을때
  const onFocusPassword = useCallback(() => {
    setPasswordFocused(true);
  }, []);

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  //* password가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email]
  );

  //* 비밀번호가 최수 자리수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        (
          /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) || // 특수 기호를 가지는지 체크
          /[0-9]/g.test(password)
        ) // 숫자를 가지는지 체크
      ),
    [password]
  );

  //* 회원가입 폼 입력 값 확인하기
  const validateSignUpForm = () => {
    //* 인풋 값이 없다면
    if (!email || !lastname || !firstname || !password) {
      return false;
    }
    //* 비밀번호가 올바르지 않다면
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }
    //* 생년월일 셀렉터 값이 없다면
    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }
    return true;
  };

  //* 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`
          ).toISOString(),
        };
        const { data } = await signupAPI(signUpBody);

        dispatch(userActions.setLoggedUser(data));

        closeModal();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };

  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode('login'));
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  });

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          type="email"
          name="email"
          value={email}
          icon={<MailIcon />}
          isValid={!!email}
          placeholder="이메일 주소"
          onChange={onChangeEmail}
          useValidation
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="input-wrapper">
        <Input
          value={lastname}
          icon={<PersonIcon />}
          placeholder="이름(예:길동)"
          useValidation
          onChange={onChangeLastname}
          errorMessage="이름을 입력해주세요."
          isValid={!!lastname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          value={firstname}
          icon={<PersonIcon />}
          placeholder="성(예: 홍)"
          useValidation
          onChange={onChangeFirstname}
          errorMessage="성을 입력하세요."
          isValid={!!firstname}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          type={hidePassword ? 'password' : 'text'}
          name="password"
          value={password}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          placeholder="비밀번호 설정하기"
          onChange={onChangePassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요"
          onFocus={onFocusPassword}
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning isValid={!isPasswordOverMinLength} text="최소 8자" />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 포함하세요."
          />
        </>
      )}
      <p className="sign-up-birthday-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={['월']}
            defaultValue="월"
            value={birthMonth}
            isValid={!!birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue="일"
            value={birthDay}
            isValid={!!birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            value={birthYear}
            isValid={!!birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={changeToLoginModal}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthdat-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

export default SignUpModal;
