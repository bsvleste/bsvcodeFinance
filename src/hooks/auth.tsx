import { createContext ,ReactNode, useContext} from "react";

interface AuthProps{
  children: ReactNode;
}
interface IUser{
  id:string
  name:string
  email:string
  photo?:string
}
interface IAuthContextData{
  user:IUser 
}
const AuthContext = createContext({} as IAuthContextData)
function AuthProvider({children}:AuthProps){
  const user={
    id:"123",
    name:"Bruno de souza Valeiro",
    email:"bvaleiro@gmail.com"
  }
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}
function useAuth(){
  const context = useContext(AuthContext)
  return context
}
export {useAuth,AuthProvider}