import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    memberList: [],
  };

  export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember: (state, action) => {
        console.log(action.payload);
        state.memberList=action.payload;
      },
     addMember: (state, action) => {
        console.log(action.payload);
        state.memberList.push(action.payload);
      },
      deleteMember: (state, action) => {
        console.log(action.payload);
        state.memberList = state.memberList.filter(u => u.id !== action.payload.id);
      },
      updateMember(state, action) {
        const { id, updatedMember } = action.payload;
        const memberToUpdate = state.memberList.find(member => member.id === id);
        if (memberToUpdate) {
          Object.assign(memberToUpdate, updatedMember);
        }
      },
      updateCovid(state, action) {
        const { id, updatedMember } = action.payload;
        console.log(action.payload);
        const memberToUpdate = state.memberList.find(member => member.id === id);
        if (memberToUpdate) {
          Object.assign(memberToUpdate.memberCovid, updatedMember);
        }
      },
  
      
    
    
    }
  
  });
  

  export const {setMember ,deleteMember,updateMember,addMember,updateCovid} = memberSlice.actions;

  export default memberSlice.reducer;