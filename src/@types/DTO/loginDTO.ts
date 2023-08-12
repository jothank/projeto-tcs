export interface BasicTypeDTO {
    nome?: string,
    email?: string,
    telefone?: string,
    senha?: string,
    newUserError?: Object
    confirmarSenha?: string
}

export interface UserAddressDTO {
    street: string,
    state: string,
    neighborhood: string,
    country: string,
    city: string,
    cep: string,
    number: string,
}

export interface UserAddressErrorDTO {
    street: string,
    state: string,
    neighborhood: string,
    country: string,
    city: string,
    cep: string,
    number: string,
}

export interface UserFileDTO {
    name: string,
    type:string,
    base64: string,
}
