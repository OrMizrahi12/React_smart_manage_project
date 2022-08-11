import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = []

export const CountPriceSlice = createSlice({
    name: 'itemList',
    initialState,
    reducers: {
        addItem: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(equipmentName, price) {
                return {
                    payload: {
                        equipmentName,
                        price,
                        id: nanoid()
                    }
                }
            },
        },
        deleteSingleItem(state, action) {
            return state.filter(item => item.id !== action.payload.idDel)
        }
    }
})

export const { addItem, deleteSingleItem } = CountPriceSlice.actions;
export default CountPriceSlice.reducer;