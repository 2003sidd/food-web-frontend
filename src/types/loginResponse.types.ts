export interface LoginResponse {
  authToken: string,
  user: UserInterface

}

export interface UserInterface {
  _id: string
  name: string,
  email: string
}