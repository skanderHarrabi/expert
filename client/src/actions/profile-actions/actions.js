import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CREATE_PROFILE,
  PROFILE_CREATION_FAILED
} from './types';

import ProfileServices from "./services";


export const getProfiles = ()=>{
console.log('eee');
 
  return  dispatch =>
  {  
    
        ProfileServices.getProfilesRequest().
        then((res)=>{
          console.log(res);
          dispatch({ type: GET_PROFILE, payload: res.data });
        })
        .catch(err=>console.log(err));
     

  };
   
};



export function createProfile(values) {
  return async dispatch => {
    try {
      const response = await ProfileServices.createProfileRequest(values);
      dispatch({ type: CREATE_PROFILE, payload: values });
    } catch (e) {
      dispatch({ type: PROFILE_CREATION_FAILED });
    }
  };
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};