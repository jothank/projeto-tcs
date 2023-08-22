

export interface addNewUserDTO {
    cpf: string,
	email: string,
    name: string,
    phone: string,
	password1: string,
	password2: string,
	username: string
	
}

export interface getUsersDTO {
		address: {
			street: string,
			state:string,
			city: string,
			cep: string,
		},
		_id: string,
		name: string,
		password?: string,
		email: string,
		phone: string,
		doc: string,
		isOrganization: boolean,
		paymentMethod: string,
		approved: boolean,
		type: string,
		file: [
			string,
		],
		createdAt: string,
		updatedAt: string,
		__v: number
	
}
