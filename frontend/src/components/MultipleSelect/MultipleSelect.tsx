import React from 'react';
import { SelectChangeEvent, MenuItem, FormControl, InputLabel, Select, Chip} from '@mui/material';

interface Option {
  _id: string;
  name: string;
}

interface Props {
  label: string;
  selectedValues: string[];
  onChange: (selectedIds: string[]) => void;
  options: Option[];
}

const MultipleSelect: React.FC<Props> = ({ label, selectedValues, onChange, options }) => {
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={handleSelectChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={options.find((option) => option._id === value)?.name} />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
