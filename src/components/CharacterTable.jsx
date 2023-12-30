import useCharacterStatQuery from '../service/hooks/useChacterStatQuery';
import { getCurrentDateString } from '../util/dateUtility';

export default function CharacterTable({ ocid }) {
  const { data } = useCharacterStatQuery(ocid, getCurrentDateString(-2));
  if (ocid === null || ocid === undefined || ocid.length <= 1) {
    return <div></div>;
  }

  return <div className='text-white text-3xl'>{JSON.stringify(data)}</div>;
}
