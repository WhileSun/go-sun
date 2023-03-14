import { useState } from 'react';

export default ()=>{
  const [stores, setStores] = useState<{[key:string]:any}>({});
  return {
    stores,
    setStores,
  };
}