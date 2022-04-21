/* eslint-disable react/jsx-curly-newline */
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { BedType } from '../../types/room';
import { bedTypes } from '../../lib/staticData';
import { registerRoomActions } from '../../store/registerRoom';
import Button from '../common/Button';
import palette from '../../styles/palette';
import Counter from '../common/Counter';
import Selector from '../common/Selector';

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);

  const initialBedOptions = bedroom.beds.map((bed) => bed.type);
  const [activeBedOptions, setActiveBedOptions] =
    useState<BedType[]>(initialBedOptions);

  const dispatch = useDispatch();

  //* 침대 개수 총합
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  //* 침대 종류 텍스트
  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(',');
  }, [bedroom]);

  //* 남은 침대 옵션들
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activeBedOptions.includes(bedType));
  }, [activeBedOptions, bedroom]);

  //* 침실유형 열고 닫기
  const toggleOpened = () => setOpened(!opened);

  //* 침실 침대 갯수 변경시
  const onChangeBedTypeCount = (value: number, type: BedType) =>
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개<br />
            {bedsText}
          </p>
        </div>
        <Button width="161px" onClick={toggleOpened}>
          {opened && '완료'}
          {!opened &&
            (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>

      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          {activeBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                key={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                onChange={(value) => onChangeBedTypeCount(value, type)}
              />
            </div>
          ))}
          <Selector
            type="register"
            defaultValue="다른 침대 추가"
            value="다른 침대 추가"
            disabledOptions={['다른 침대 추가']}
            options={lastBedOptions}
            useValidation={false}
            onChange={(e) =>
              setActiveBedOptions([
                ...activeBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};

  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
  }

  .register-room-bed-type-selector-wrapper {
    margin-top: 28px;
    width: 320px;
  }

  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }

  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }

  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
    max-width: 240px;
    word-break: keep-all;
  }
`;
export default RegisterRoomBedTypes;
