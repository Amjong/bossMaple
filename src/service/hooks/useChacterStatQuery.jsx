import { useQuery } from '@tanstack/react-query';
import { getCharacterStatUrl } from '../../util/openApiManager';

let fetchData = async (ocid, date) => {
  const response = await fetch(getCharacterStatUrl(ocid, date), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-nxopen-api-key': process.env.REACT_APP_MAPLE_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export default function useCharacterStatQuery(ocid, date) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [ocid],
    queryFn: () => fetchData(ocid, date),
    suspense: true,
  });
  return { data, isLoading, isError };
}
