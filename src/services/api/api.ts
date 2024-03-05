import { IEntity } from "../types/types";
import { http } from "./http";

export const signIn = async (data: IEntity.UserSignIn) => {
  try {
    const response = await http.post('/api/v1/users/', data);
    
    if (response.data) {
            
      return response.data;
    } else {
      console.error('Error: Response data is undefined');
      throw new Error('Response data is undefined');
    }
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};
