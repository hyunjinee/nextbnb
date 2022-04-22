import { useSelector } from '../../store';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);
  console.log(bedList);
  return (
    <ul>
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
};

export default RegisterRoomBedList;
