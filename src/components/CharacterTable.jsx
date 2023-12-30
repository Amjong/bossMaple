export default function CharacterTable({ nickname }) {
  if (nickname === null || nickname === undefined || nickname.length <= 1) {
    return <div></div>;
  }
  return <div className='text-white text-3xl'>{JSON.stringify(nickname)}</div>;
}
