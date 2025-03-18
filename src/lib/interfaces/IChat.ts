export interface IUser {
  id:number
  name:string
  email: string
}

export interface IChat {
  receiver_user: IUser,
  messages: [{
      user_sender_id: number
			user_receiver_id: number
			content: string
  }]
}
