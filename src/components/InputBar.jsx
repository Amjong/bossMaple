import { useState } from 'react';

export default function InputBar({ handleSubmit }) {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='캐릭터 닉네임을 입력해주세요'
        value={text}
        onChange={handleChange}
        type='text'
      ></input>
    </form>
  );
}
