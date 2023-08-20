export interface check_CPF_DTO {
    ni: string,
    nome: string,
    situacao: {
        codigo: string,
        descricao: string
    },
    nascimento: string
}
