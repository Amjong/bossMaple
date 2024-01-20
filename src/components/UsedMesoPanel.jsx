import { useMemo, useState } from 'react';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { calculateCostForEachItemsFromArray } from '../util/starforceUtility';
import { useTable, useFilters, useSortBy } from 'react-table';
import FilterListIcon from '@mui/icons-material/FilterList';

function CheckboxColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [selectAll, setSelectAll] = useState(false);

  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setFilter(selectAll ? [] : options);
  };

  return (
    <div className='flex flex-col'>
      <label>
        <input type='checkbox' checked={selectAll} onChange={toggleSelectAll} />{' '}
        전체 선택
      </label>
      {options.map((option, i) => (
        <label key={i}>
          <input
            type='checkbox'
            checked={filterValue?.includes(option) || false}
            onChange={(e) => {
              const array = filterValue || [];
              if (e.target.checked) {
                setFilter([...array, option]);
              } else {
                setFilter(array.filter((value) => value !== option));
              }
            }}
          />{' '}
          {option}
        </label>
      ))}
    </div>
  );
}

function Table({ columns, data }) {
  const [showFilters, setShowFilters] = useState({});
  const defaultColumn = useMemo(
    () => ({
      Filter: CheckboxColumnFilter,
      filter: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return filterValue.includes(rowValue);
        });
      },
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, defaultColumn }, useFilters, useSortBy);

  return (
    <table {...getTableProps()} className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(
                  column.id === 'meso' ? column.getSortByToggleProps() : {}
                )}
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                {column.render('Header')}

                {column.id === 'meso' ? (
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ' -'}
                  </span>
                ) : (
                  <div className='relative inline-block text-left'>
                    <button
                      onClick={() =>
                        setShowFilters({
                          ...showFilters,
                          [column.id]: !showFilters[column.id],
                        })
                      }
                      className='ml-2 w-[20px] h-[20px]'
                    >
                      <FilterListIcon />
                    </button>
                    {showFilters[column.id] && column.canFilter ? (
                      <div className='origin-top-right absolute right-0 mt-2 left-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                        <div
                          className='py-1'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='options-menu'
                        >
                          {column.render('Filter')}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className='bg-white divide-y divide-gray-200'
      >
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'
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

export default function UsedMesoPanel() {
  const [starforceInfoArray] = useStarforceInfoArray();
  const columns = useMemo(
    () => [
      {
        Header: '아이템',
        accessor: 'item',
      },
      {
        Header: '캐릭터명(서버)',
        accessor: 'character',
      },
      {
        Header: '사용 메소량',
        accessor: 'meso',
        disableFilters: true,
      },
    ],
    []
  );
  return (
    <div>
      {starforceInfoArray.length !== 0 && (
        <Table
          columns={columns}
          data={Array.from(
            calculateCostForEachItemsFromArray(starforceInfoArray)
          ).map((element) => {
            let convertedKey = element[0].split('|');
            return {
              item: convertedKey[0],
              character: convertedKey[1],
              meso: element[1],
            };
          })}
        />
      )}
    </div>
  );
}
