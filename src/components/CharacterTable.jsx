export default function CharacterTable({ ocid }) {
  if (ocid === null || ocid === undefined || ocid.length <= 1) {
    return <div></div>;
  }

  return <div className='text-white text-3xl'>{JSON.stringify(ocid)}</div>;
}
