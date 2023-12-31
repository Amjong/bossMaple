import useCharacterStatQuery from '../service/hooks/useChacterStatQuery';
import { getCurrentDateString } from '../util/dateUtility';
import { getCombatPower } from '../util/statApi';

export default function CharacterTable({ ocid }) {
  const { data } = useCharacterStatQuery(ocid, getCurrentDateString(-2));
  console.log(data);
  if (ocid === null || ocid === undefined || ocid.length <= 1) {
    return <div></div>;
  }

  return (
    <div className='text-white text-3xl'>전투력 : {getCombatPower(data)}</div>
  );
}
