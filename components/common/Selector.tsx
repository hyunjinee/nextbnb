/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from '../../store';
import WarningIcon from '../../public/static/svg/common/warning.svg';
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'register' | 'normal';
}

const Selector: React.FC<IProps> = ({
  label,
  options = [],
  disabledOptions = [],
  isValid,
  type = 'normal',
  useValidation = true,
  errorMessage = '옵션을 선택하세요',
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      isValid={!!isValid}
      validateMode={useValidation && validateMode}
      type={type}
    >
      <label>
        {label && <span>{label}</span>}
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
      </label>
      {useValidation && !validateMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

const normalSelectorStyle = css`
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

const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-apperance: none;
    background-image: url('/static/svg/common/selector/register_selector_down_arrow.svg');
    background-repeat: no-repeat;
    background-position: right 14px center;
    font-size: 16px;
  }
`;

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: 'register' | 'normal';
}

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === 'normal' && normalSelectorStyle}
  ${({ type }) => type === 'register' && RegisterSelectorStyle}

  select {
    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}
  }

  &:disabled {
    background-image: url('/static/svg/common/selector/disabled_register_selector_down_arrow.svg');
    background-color: ${palette.gray_f7};
    border-color: ${palette.gray_e5};
    color: ${palette.gray_e5};
    cursor: not-allowed;
  }

  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }
  }
`;

export default React.memo(Selector);
