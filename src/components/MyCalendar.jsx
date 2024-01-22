import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ReactDatePicker from 'react-datepicker';
import TodayIcon from '@mui/icons-material/Today';

const getYear = (date) => {
  return date.getFullYear();
};

const getMonth = (date) => {
  return date.getMonth(); // JavaScript의 getMonth()는 0부터 11까지의 값을 반환하므로, 1을 더해줍니다.
};

const YEARS = Array.from(
  { length: getYear(new Date()) + 1 - 2000 },
  (_, i) => getYear(new Date()) - i
);
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function MyCalendar({
  selected,
  onChange,
  minDate,
  maxDate,
  placeholderText,
}) {
  return (
    <div className='bg-n1'>
      <ReactDatePicker
        // 요일이 Su Mo Tu가 아닌 S M T 형태로 나타냄
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        minDate={minDate}
        maxDate={maxDate}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        className='font-regular bg-n1 text-white text-center border-white border-2 focus:outline-n1'
        shouldCloseOnSelect
        icon={<TodayIcon sx={{ color: '#ffffff' }} />}
        showIcon
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#282C47',
              height: '100%',
              marginTop: '8px',
              padding: '0 12px 0 24px',
            }}
          >
            <div>
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '400',
                }}
              >
                {MONTHS[getMonth(date)]}
              </span>
              <select
                value={getYear(date)}
                style={{
                  backgroundColor: '#282C47',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '400',
                  paddingRight: '5px',
                  cursor: 'pointer',
                  fontFamily: 'NexonGothicRegular',
                }}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type='button'
                onClick={decreaseMonth}
                style={{
                  width: '34px',
                  height: '34px',
                  padding: '5px',
                  borderRadius: '50%',
                }}
                disabled={prevMonthButtonDisabled}
              >
                <KeyboardArrowLeftIcon fill='#ffffff' />
              </button>
              <button
                type='button'
                onClick={increaseMonth}
                style={{
                  width: '34px',
                  height: '34px',
                  padding: '5px',
                  borderRadius: '50%',
                }}
                disabled={nextMonthButtonDisabled}
              >
                <KeyboardArrowRightIcon fill='#ffffff' />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
