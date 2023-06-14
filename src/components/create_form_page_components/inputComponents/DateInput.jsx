import {useState} from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

export default function DateInput() {
  const [value, setValue] = useState(dayjs(new Date()));
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
    event.target.style.height = "auto"; // Reset the height
    event.target.style.height = `${event.target.scrollHeight}px`; // Set the height based on the content
  };
  return (
    <>
    <div className="short-text-input-container">
      <div className="form question">
        <textarea
          className="input"
          placeholder="Question"
          type="text"
          onChange={handleChange}
        />
        <span className="input-border"></span>
      </div>
    </div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="select time"
          defaultValue={dayjs(new Date())}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    </>
  );
}