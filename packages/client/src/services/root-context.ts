import { createContext, useContext } from 'react';

import { rootStore } from './root-store.ts';

const StoreContext = createContext(rootStore);

const useStores = () => useContext(StoreContext);

export { StoreContext, useStores };
