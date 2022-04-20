import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from '../../store';
import WarningIcon from '../../public/static/svg/common/warning.svg';
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'register' | 'normal';
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid,
  useValidation = true,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={useValidation && validateMode}>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    outline: none;
    padding: 0 11px;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-repeat: no-repeat;
    background-position: right 11px center;
    font-size: 16px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

export default Selector;
