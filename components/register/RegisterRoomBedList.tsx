import { useSelector } from '../../store';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);
  console.log(bedList);
  return (
    <ul>
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
    </ul>
  );
};

export default RegisterRoomBedList;
