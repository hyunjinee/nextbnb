import { useSelector } from '../../../store';

const SearchRoomBarLocation: React.FC = () => {
  const location = useSelector((state) => state.searchRoom.location);
};
