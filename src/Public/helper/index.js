import { useState } from 'react';

const useInputText = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bindText: {
      defautlValue: value,
      onChangeText: text => {
        setValue(text);
      }
    }
  };
};

export { useInputText };
