import { Skeleton } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { useFilters, useTable } from 'react-table';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { useLoading } from '../context/loadingContext';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getStarforceResultInfo } from '../util/starforceUtility';
import { useContentError } from '../context/contentErrorContext';
import MasterToolTip from './ui/MasterToolTip';
import { useCapture } from '../service/hooks/useCapture';
import { MasterPrimaryButton } from './ui/MasterPrimaryButton';
import MasterSnackBar from './ui/MasterSnackBar';

const fillRangeInArray = (array, start, end) => {
  // Generate an array of numbers within the given range
  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Concatenate the original array with the range array
  const result = array.concat(range);

  // Remove duplicates and return the result
  return [...new Set(result)];
};

const removeRangeFromArray = (array, start, end) => {
  // Generate an array of numbers within the given range
  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Remove numbers in the range from the array
  const result = array.filter((item) => !range.includes(item));

  // Return the result
  return result;
};

const filterOptions = [
  {
    label: '0 -> 12',
    range: [0, 11],
  },
  {
    label: '12 -> 22',
    range: [12, 21],
  },
  {
    label: '22 -> 25',
    range: [22, 24],
  },
];
function CheckboxColumnFilter({ column: { filterValue, setFilter } }) {
  const [values, setValues] = useState([1]);
  const [selectAll, setSelectAll] = useState(false);
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setFilter(selectAll ? [] : Array.from({ length: 25 }, (_, i) => i));
    setValues(selectAll ? [] : [0, 1, 2]);
  };
  return (
    <div className='flex flex-col space-y-2'>
      <label>
        <input
          type='checkbox'
          checked={selectAll || values.length === 3}
          onChange={toggleSelectAll}
        />
        전체 선택
      </label>
      {filterOptions.map(({ label, range }, i) => (
        <label key={i}>
          <input
            type='checkbox'
            checked={values.includes(i) || selectAll}
            id={i}
            onChange={(e) => {
              const array = filterValue || [];
              const idInt = parseInt(e.target.id);
              if (e.target.checked) {
                setFilter(fillRangeInArray(array, range[0], range[1]));
                if (values.length === 2) setSelectAll(true);
                setValues([...values, idInt]);
              } else {
                setFilter(removeRangeFromArray(array, range[0], range[1]));
                setValues(values.filter((value) => value !== idInt));
                setSelectAll(false);
              }
            }}
          />
          {label}
        </label>
      ))}
    </div>
  );
}

function Table({ columns, data }) {
  const [showFilter, setShowFilter] = useState(false);
  const initialState = {
    filters: [
      {
        id: 'step',
        value: Array.from({ length: 10 }, (_, i) => 12 + i),
      },
    ],
  };
  const defaultColumn = useMemo(
    () => ({
      Filter: CheckboxColumnFilter,
      filter: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values.step.props.children[1];
          return filterValue.includes(rowValue);
        });
      },
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, defaultColumn, initialState }, useFilters);

  return (
    <table {...getTableProps()} className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-black font-bold text-white border-b-2 border-white '>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className='px-6 py-3 text-left text-xs text-white uppercase tracking-wider'
              >
                {column.render('Header')}

                {column.id === 'step' && (
                  <div className='relative inline-block text-left'>
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className='ml-2 w-[20px] h-[20px]'
                    >
                      <FilterListIcon />
                    </button>
                    {showFilter && (
                      <div className='origin-top-right absolute font-regular text-white right-0 mt-2 left-10 w-56 rounded-md shadow-lg bg-n2 ring-1 ring-black ring-opacity-5'>
                        <div
                          className='py-1'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='options-menu'
                        >
                          {column.render('Filter')}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, i) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-white font-regular border-1 border-b border-white ${
                      i % 2 === 0 ? 'bg-n2' : 'bg-n1'
                    }`}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const TableSkeleton = () => {
  return (
    <table>
      <tbody>
        {Array.from({ length: 15 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <td key={colIndex}>
                <Skeleton variant='rect' width={350} height={80} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function SuccessRatePanel() {
  const [starforceInfoArray] = useStarforceInfoArray();
  const [isLoading] = useLoading();
  const [errorText] = useContentError();
  const tableRef = useRef(null);
  const capture = useCapture(tableRef);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: '강화 단계',
        accessor: 'step',
      },
      {
        Header: (
          <span>
            시도 횟수
            <br />
            (캐치 O/X)
          </span>
        ),
        accessor: 'try',
        disableFilters: true,
      },
      {
        Header: '성공 횟수 / 기댓값',
        accessor: 'success',
        disableFilters: true,
      },
      {
        Header: '실패 횟수',
        accessor: 'failure',
        disableFilters: true,
      },
      {
        Header: '파괴 횟수',
        accessor: 'destroy',
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <div>
      {errorText === '' && isLoading && <TableSkeleton />}
      {errorText === '' && !isLoading && starforceInfoArray.length !== 0 && (
        <div>
          <div className='mb-5 mt-20 flex justify-between'>
            <span className='mr-2 flex gap-2 items-center'>
              <MasterToolTip
                text='130레벨 이상의 아이템만 지원합니다.
              슈페리얼 아이템은 현재 미지원 입니다.
              이외 일부 아이템은 지원하지 않을 수 있습니다.'
                placement='bottom-end'
              />
              <span className='text-y4 font-bold text-[20px]'>유의사항</span>
            </span>
            <MasterPrimaryButton
              text='이미지 복사'
              color='r2'
              onClick={() => {
                capture(tableRef.current);
                setIsSnackBarOpen(true);
              }}
            />
          </div>
          <div ref={tableRef}>
            <Table
              columns={columns}
              data={getStarforceResultInfo(starforceInfoArray).map(
                (element, index) => {
                  return {
                    step: (
                      <span>
                        <StarIcon fontSize='small' sx={{ color: '#FFE380' }} />
                        {index} {' > '}
                        <StarIcon fontSize='small' sx={{ color: '#FFE380' }} />
                        {index + 1}
                      </span>
                    ),
                    try: (
                      <span>
                        <span className='font-bold'>
                          {element[0] + element[1]}회
                        </span>

                        <br />
                        <span className='font-regular'>
                          {'('}
                          {element[0]}
                          {'/'}
                          {element[1]}
                          {')'}
                        </span>
                      </span>
                    ),
                    success: (
                      <span className='font-bold'>
                        {`${element[2]}회 / ${element[5]}회`}
                        <br />
                        {element[2] !== 0 && element[5] !== 0 && (
                          <span className='font-regular'>
                            {'('}기댓값보다{' '}
                            {element[2] > element[5] ? (
                              <span className='text-y4'>
                                {`${((element[2] / element[5]) * 100).toFixed(
                                  0
                                )}%`}{' '}
                                높습니다.
                              </span>
                            ) : (
                              <span className='text-r3'>
                                {`${
                                  100 -
                                  ((element[2] / element[5]) * 100).toFixed(0)
                                }%`}{' '}
                                낮습니다.
                              </span>
                            )}
                            {')'}
                          </span>
                        )}
                      </span>
                    ),
                    failure: `${element[3]}회`,
                    destroy: `${element[4]}회`,
                  };
                }
              )}
            />
          </div>
          <MasterSnackBar
            open={isSnackBarOpen}
            onClose={() => setIsSnackBarOpen(false)}
            message='클립보드에 복사되었습니다.'
          />
        </div>
      )}
    </div>
  );
}
