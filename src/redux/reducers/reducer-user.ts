import { USER_DETAIL } from "../actions/actions-user";

export interface UserDetails {
    id: number;
    first_name: string;
    last_name: string;
}

export interface User {
    user: UserDetails | undefined;
}

const initialState = {
    user: undefined
};

function user(state: User = initialState, data: any): any {
    switch(data.type) {
        case USER_DETAIL:
            return {
                user: undefined,
            };
        default:
            return state;
    }
}

export const UserReducers = user;
