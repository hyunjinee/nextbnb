import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';

import { useSelector } from '../store';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';

const HeaderUserProfile: React.FC = () => {
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpened) {
          setIsUsermenuOpened(false);
        }
      }}
      data-cy="user-profile"
    >
      <button
        style={{ marginRight: '80px' }}
        className="header-user-profile"
        type="button"
        onClick={() => {
          setIsUsermenuOpened(!isUsermenuOpened);
        }}
      >
        <HamburgerIcon />
        <img
          src={userProfileImage}
          className="header-user-profile-image"
          alt="profileImage"
        />
      </button>
      {isUsermenuOpened && (
        <ul className="header-usermenu">
          <li>숙소관리</li>
          <Link href="/room/register/building">
            <a
              role="presentation"
              onClick={() => {
                setIsUsermenuOpened(false);
              }}
            >
              <li data-cy="room-register">숙소 등록하기</li>
            </a>
          </Link>
          <div className="header-usermenu-divider" />
          <li role="presentation" onClick={logout}>
            로그아웃
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
