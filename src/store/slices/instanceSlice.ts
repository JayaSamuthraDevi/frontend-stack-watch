// store/slices/instanceSlice.ts
import { InstanceStateType, InstanceType } from '@/types/InstancesType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InstanceStateType = {
  instance: null,
  duration: '1h',
  isLoading: false,
  error: null,
};

const instanceSlice = createSlice({
  name: 'instances',
  initialState,
  reducers: {
    // addInstance: (state, action: PayloadAction<Omit<InstanceType, 'id' | 'createdAt'>>) => {
    //   const newInstance: InstanceType = {
    //     id: crypto.randomUUID(),
    //     createdAt: new Date().toISOString(),
    //     ...action.payload,
    //   };
    //   state.instances.push(newInstance);
    // },
    // removeInstance: (state, action: PayloadAction<string>) => {
    //   state.instances = state.instances.filter(instance => instance.id !== action.payload);
    // },
    // updateInstance: (state, action: PayloadAction<InstanceType>) => {
    //   const index = state.instances.findIndex(instance => instance.id === action.payload.id);
    //   if (index !== -1) {
    //     state.instances[index] = action.payload;
    //   }
    // },
    setCurrentInstance: (state, action: PayloadAction<InstanceType | null>) => {
      state.instance = action.payload;
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  // addInstance, removeInstance, updateInstance, 
  setCurrentInstance, setDuration, setError } = instanceSlice.actions;
export default instanceSlice.reducer;
