import { useState } from 'react';

export default function InputBar({ id, handleSubmit }) {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <form id={id} onSubmit={handleSubmit}>
      <input
        placeholder='캐릭터 닉네임을 입력해주세요'
        value={text}
        onChange={handleChange}
        type='text'
        className='w-64 text-center'
      ></input>
      <button>제출</button>
    </form>
  );
}
