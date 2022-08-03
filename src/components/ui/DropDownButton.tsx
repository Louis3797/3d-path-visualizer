import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

type DropDownButtonProps = {
  onChange:
    | ((event: SelectChangeEvent<any>, child: React.ReactNode) => void)
    | undefined;
  value: unknown;
  label: string;
  data: { name: string | number; value: string | number }[];
};

const DropDownButton: React.FC<DropDownButtonProps> = ({
  onChange,
  value,
  label,
  data,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        {data.map((value, _) => {
          return (
            <MenuItem value={value.value} key={value.name}>
              {value.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DropDownButton;
