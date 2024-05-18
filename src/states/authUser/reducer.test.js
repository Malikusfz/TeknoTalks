/**
 * Test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the authUser when given a SET_AUTH_USER action
 *   - should return null when given an UNSET_AUTH_USER action
 */

import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
    it('should return the initial state when given an unknown action', () => {
        // arrange
        const initialState = null;
        const action = { type: 'UNKNOWN' };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the authUser when given a SET_AUTH_USER action', () => {
        // arrange
        const initialState = null;
        const action = {
            type: ActionType.SET_AUTH_USER,
            payload: {
                authUser: {
                    id: 'john_doe',
                    name: 'John Doe',
                    email: 'john@example.com',
                    avatar: 'https://generated-image-url.jpg',
                },
            },
        };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.authUser);
    });

    it('should return null when given an UNSET_AUTH_USER action', () => {
        // arrange
        const initialState = {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
        };

        const action = {
            type: ActionType.UNSET_AUTH_USER,
        };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toBeNull();
    });
});
