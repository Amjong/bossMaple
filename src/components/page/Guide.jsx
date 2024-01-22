import { useState } from 'react';
import ApiKeyGuidePanel from '../ApiKeyGuidePanel';
import QnaPanel from '../QnaPanel';
import TabBtns from '../ui/TapBtns';

const tabBtnsArray = [
  {
    text: 'API KEY 발급',
    component: <ApiKeyGuidePanel />,
  },
  {
    text: 'Q&A',
    component: <QnaPanel />,
  },
];

export default function Guide() {
  const [menu, setMenu] = useState(0);
  const handleChange = (value) => {
    setMenu(value);
  };
  return (
    <div className='flex flex-col bg-n1 h-screen'>
      <div className='ml-10 mt-5'>
        <TabBtns onChanged={handleChange} tabBtnsArray={tabBtnsArray} />
      </div>

      <div className='m-10 bg-n2 h-full'>{tabBtnsArray[menu].component}</div>
    </div>
  );
}
