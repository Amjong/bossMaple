import { useQuery } from '@tanstack/react-query';
import { getStarForceUrl } from '../../util/openApiManager';

let fetchData = async (count, dateString, cursor) => {
  const response = await fetch(getStarForceUrl(count, dateString, cursor), {
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

export default function useStarforceQuery(count, dateString, cursor) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['StarforceInfo'],
    queryFn: () => fetchData(count, dateString, cursor),
    suspense: true,
  });
  return { data, isLoading, isError };
}
