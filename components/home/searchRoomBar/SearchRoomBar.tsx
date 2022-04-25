import styled from 'styled-components';

const SearchRoomBar: React.FC = () => {
  return (
    <Container>
      <div className="search-room-bar-inputs">
        <div className="search-room-bar-input-divider" />
        <div className="search-room-bar-input-divider" />
        <div className="search-room-bar-input-divider" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70px;
`;

export default SearchRoomBar;
