export class Clients {
   id : number;
   nomecompleto :string;
   dtnascimento : string;
   sexo: string;
   cpf: string;
   telefones: string;
   email : string;

   constructor( id : number, nomecompleto :string, dtnascimento : string, sexo: string, cpf: string, telefones: string, email : string)
   {
    this.id = id;
    this.nomecompleto = nomecompleto;
    this.dtnascimento = dtnascimento;
    this.sexo = sexo;
    this.cpf = cpf;
    this.email = email;
    this.telefones = telefones;
    }
}

