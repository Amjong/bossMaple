import useStarforceQuery from '../service/hooks/useStarforceQuery';

export default function StarforceInfo() {
  const { data } = useStarforceQuery(10, '2023-12-27');
  return (
    <div>
      <div className='text-white text-3xl'>스타포스 정보!</div>
      <div className='text-white text-3xl'>{JSON.stringify(data)}</div>
    </div>
  );
}
