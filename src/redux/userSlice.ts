import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    _id: string | null;
    name: string;
    email: string;
    phone: string;
    isVerified: boolean;
    role: string | null;
    profile: any;  
    profileModel: any;
}

const initialState: UserState = {
    _id: null,
    name: "",
    email: "",
    phone: "",
    isVerified: false,
    role: null,
    profile: null,
    profileModel: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state._id = action.payload._id || action.payload.id; 
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.isVerified = action.payload.isVerified;
            
            const role = action.payload.role;
            state.role = (role && typeof role === 'object' && role.name) ? role.name : role;
            
            state.profile = action.payload.profile;
            state.profileModel = action.payload.profileModel;
        },

        logout() {
            return { ...initialState };
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
