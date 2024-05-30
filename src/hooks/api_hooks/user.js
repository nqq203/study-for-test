import { useMutation, useQuery } from "react-query";
import { signIn, signOut, signUp } from "../../apis/user";

export function useSignIn() {
  return useMutation(signIn);
}

// export function useSignOut() {
//   return useQuery
// }