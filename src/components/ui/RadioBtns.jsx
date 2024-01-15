import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

export default function RadioBtns({ onSelect }) {
  const [selectedValue, setSelectedValue] = useState('all');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onSelect(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    inputProps: { 'aria-label': item },
  });
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='periodSettingOption'
        name='row-radio-btns-group'
      >
        <FormControlLabel
          value='all'
          control={
            <Radio
              {...controlProps('all')}
              sx={{
                color: 'white',
                '&.Mui-checked': {
                  color: '#DA4933',
                },
              }}
            />
          }
          label='전체'
          sx={{
            '& .MuiFormControlLabel-label': {
              color: selectedValue === 'all' ? '#DA4933' : 'white',
            },
          }}
        />
        <FormControlLabel
          value='partial'
          control={
            <Radio
              {...controlProps('partial')}
              sx={{
                color: 'white',
                '&.Mui-checked': {
                  color: '#DA4933',
                },
              }}
            />
          }
          label='기간 설정'
          sx={{
            '& .MuiFormControlLabel-label': {
              color: selectedValue === 'partial' ? '#DA4933' : 'white',
            },
          }}
        />
      </RadioGroup>
    </FormControl>
  );
}
