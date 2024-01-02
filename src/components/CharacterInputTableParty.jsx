import CharacterInputTableSolo from './CharacterInputTableSolo';

const MAX_PARTY_NUM = 6;
let partyInfoArray = [1, 2, 3, 4, 5, 6];

export default function CharacterInputTableParty() {
  return (
    <div>
      <div className='grid grid-cols-3 gap-1'>
        {partyInfoArray.map(() => {
          return <CharacterInputTableSolo />;
        })}
      </div>
    </div>
  );
}
