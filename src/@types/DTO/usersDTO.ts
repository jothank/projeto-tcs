

export interface addNewUserDTO {
    email: string,
    name: string,
    phone: string,
    approved: boolean,
    paymentMethod: string,
    isOrganization: string,
    street: string,
    address: string,
    number: string,
    state: string,
    city: string,
    cep: string,
    type?: string,
    file?: string,
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
