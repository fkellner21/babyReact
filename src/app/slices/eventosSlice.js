import { createSlice } from "@reduxjs/toolkit";

const eventosSlice = createSlice({
  name: "eventosSlice",
  initialState: { eventos: [] },
  reducers: {
    loadInitialEventos: (state, action) => {
      const { payload } = action;
      state.eventos = payload;
    },
    onDeleteEvent: (state, action) => {
      const { payload } = action;
      const newEventos = state.eventos.filter(
        (evento) => evento.id !== payload
      );
      state.eventos = newEventos;
    },
    onAddEvent: (state, action) => {
      const { payload } = action;
      const newEventos = [...state.eventos, payload];
      state.eventos = newEventos;
    },
  },
});

export const { loadInitialEventos, onDeleteEvent, onAddEvent } =
  eventosSlice.actions;
export default eventosSlice.reducer;
