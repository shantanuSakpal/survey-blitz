import {useState} from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import TextField from '@mui/material/TextField';

export default function TimePickerValue() {
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
        <MobileTimePicker
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