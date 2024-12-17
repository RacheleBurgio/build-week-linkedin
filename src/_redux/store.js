import { configureStore } from '@reduxjs/toolkit';
import reducers from './slices/index'; // Importa i reducer centralizzati

const store = configureStore({
    reducer: reducers, // Usa il reducer combinato
});

export default store;
