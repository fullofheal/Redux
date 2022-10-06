import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,    
    heroesFetchingError,
    addHero,
    removeHero
} from '../action';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, {
    [heroesFetching]: state => {state.heroesLoadingStatus = "loading"},
    [heroesFetched]: (state, action) => {
        state.heroesLoadingStatus = 'idle';
        state.heroes = action.payload;
    },
    [heroesFetchingError]: state => {
            state.heroesLoadingStatus = 'error';
        },
    [addHero]: (state, action) => {
            state.heroes.push(action.payload);
        },
    [removeHero]: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    [],
    state => state
)

// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = "loading";
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, (state) => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(addHero, (state, action) => {
//         state.heroes.push(action.payload);
//         })
//         .addCase(removeHero, (state, action) => {
//         state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addDefaultCase(() => {})
// })


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HERO_REMOVAL':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         case 'HERO_ADDED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         default: return state
//     }
// }

export default heroes;