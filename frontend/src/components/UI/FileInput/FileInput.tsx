import React, { useRef, useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  type?: string;
  errorCheck: (fieldName: string) => string | undefined;
  multiple?: boolean;
}

const FileInput: React.FC<Props> = ({
                                      onChange,
                                      name,
                                      label,
                                      type,
                                      errorCheck,
                                      multiple = false, // значение по умолчанию - false
                                    }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filenames, setFilenames] = useState<string[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map(file => file.name);
      setFilenames(selectedFiles);
    } else {
      setFilenames([]);
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        accept={type}
        name={name}
        onChange={onFileChange}
        ref={inputRef}
        multiple={multiple}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            error={Boolean(errorCheck(name))}
            helperText={errorCheck(name)}
            variant="standard"
            disabled
            label={label}
            value={filenames.join(', ')} // объединение имен файлов в строку через запятую
            onClick={activateInput}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item>
          <Button type="button" variant="contained" onClick={activateInput}>
            Выбрать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
