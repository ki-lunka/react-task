import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from '../../config/axios';
import { IUser, AirtableResponse, UserFields, SortingOptions, TrafficLog } from '../../types';
import { populateUserLogs, sortArrayBy } from '../../utils';
import logs from '../../mock-data/logs.json';

interface CardsState {
  cards: IUser[];
  offset: string;
  isLoading: boolean;
  sortBy?: SortingOptions;
}

const initialState: CardsState = {
  cards: [],
  isLoading: true,
  offset: '',
};

export const fetchCardsWithOffset = createAsyncThunk(
  'fetchCards',
  async (offset: string, thunkAPI) => {
    const params = new URLSearchParams({
      view: 'Grid view',
      pageSize: '12',
    });
    if (offset) {
      params.append('offset', offset);
    }
    const response = await axios.get<AirtableResponse<UserFields>>(`/Users?${params}`);

    if (response.status !== 200) {
      thunkAPI.rejectWithValue('Something went wrong. Please try again');
    }

    const { offset: responseOffset, records } = response.data;

    const usersData = records.map((record) => record.fields);

    return {
      offset: responseOffset || '',
      cards: populateUserLogs(usersData, logs as unknown as TrafficLog[]),
    };
  },
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    sortUsersBy: (state, action: PayloadAction<SortingOptions>) => {
      state.sortBy = action.payload;
      state.cards = sortArrayBy<IUser>(state.cards, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCardsWithOffset.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCardsWithOffset.fulfilled, (state, action) => {
      const { offset, cards } = action.payload;
      state.isLoading = false;
      state.offset = offset;
      const updatedCards = [...state.cards, ...cards];
      if (state.sortBy) {
        state.cards = sortArrayBy(updatedCards, state.sortBy);
      } else {
        state.cards = updatedCards;
      }
    });
  },
});

export const { sortUsersBy } = cardsSlice.actions;

export const selectCardsState = (state: RootState) => state.cards;

export default cardsSlice.reducer;
