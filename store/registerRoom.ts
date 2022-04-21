import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterRoomState } from '../types/reduxState';
import { BedType } from '../types/room';

//* 초기 상태
const initialState: RegisterRoomState = {
  //* 건물유형 큰 범주
  largeBuildingType: null,
  //* 건물유형
  buildingType: null,
  //* 숙소유형
  roomType: null,
  //* 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: null,
  //* 최대 숙박 인원
  maximumGuestCount: 1,
  //* 침실 개수
  bedroomCount: 0,
  //* 침대 개수
  bedCount: 1,
  //* 침대 유형
  bedList: [
    { id: 1, beds: [{ type: '소파', count: 1 }] },
    {
      id: 2,
      beds: [
        { type: '더블', count: 2 },
        { type: '싱글', count: 1 },
      ],
    },
    { id: 3, beds: [{ type: '요와 이불', count: 1 }] },
  ],
  //* 공용공간 침대 유형
  publicBedList: [{ type: '요와 이불', count: 1 }],
  //* 욕실 개수
  bathroomCount: 1,
  //* 욕실 유형
  bathroomType: null,
  //* 국가/지역
  country: '',
  //* 시/도
  city: '',
  //* 시/군/구
  district: '',
  //* 도로명주소
  streetAddress: '',
  //* 동호수
  detailAddress: '',
  //* 우편번호
  postcode: '',
  //* 위도
  latitude: 0,
  //* 경도
  longitude: 0,
  //* 편의시설
  amentities: [],
  //* 편의공간
  conveniences: [],
  //* 편의공간
  photos: [],
  //* 숙소 설명
  description: '',
  //* 숙소 제목
  title: '',
  //* 숙소 요금
  price: 0,
  //* 예약 시작 날짜
  startDate: null,
  //* 예약 마감 날짜
  endDate: null,
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
      return state;
    },
    //* '게스트용 숙소 인지' 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    //* 최대 숙박 인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    //* 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      state.bedroomCount = action.payload;
      return state;
    },
    //* 최대 침대 갯수 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    //* 침대 유형 갯수 변경하기
    setBedTypeCount(
      state,
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
    ) {
      const { bedroomId, type, count } = action.payload;

      const bedroom = state.bedList[bedroomId - 1];

      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
