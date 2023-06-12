import { useState } from 'react';
import DropdownBase from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAppDispatch } from '../../hooks/index';
import { sortUsersBy } from '../../redux/slices/cardsSlice';
import { SortingOptions } from '../../types';

const options = [
  {
    text: 'Name',
    value: SortingOptions.NAME,
  },
  {
    text: 'Impressions',
    value: SortingOptions.TOTAL_IMPRESSIONS,
  },
  {
    text: 'Conversions',
    value: SortingOptions.TOTAL_CONVERSIONS,
  },
  {
    text: 'Revenue',
    value: SortingOptions.TOTAL_REVENUE,
  },
];

export const Dropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const [dropdownText, setDropdownText] = useState('');

  const handleClick = (value: SortingOptions, text: string) => {
    dispatch(sortUsersBy(value));
    setDropdownText(text);
  };

  return (
    <DropdownButton title={`Sort by: ${dropdownText}`}>
      {options.map(({ value, text }, index) => (
        <DropdownBase.Item as="li" onClick={() => handleClick(value, text)} key={index}>
          {text}
        </DropdownBase.Item>
      ))}
    </DropdownButton>
  );
};
