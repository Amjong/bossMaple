import useCharacterStatQuery from '../service/hooks/useCharacterStatQuery';
import { getCurrentDateString } from '../util/dateUtility';

export default function CharacterTable({ ocid }) {
  const { data } = useCharacterStatQuery(ocid, getCurrentDateString(-2));
  console.log(data);
  if (ocid === null || ocid === undefined || ocid.length <= 1) {
    return <div></div>;
  }

  return <div></div>;
}
