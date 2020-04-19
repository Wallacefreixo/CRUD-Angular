import { Component, OnInit } from '@angular/core';
import { Clients } from '../clients';
import { ClientsService } from '../clients.service';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})


export class ClientsComponent implements OnInit {
  constructor(private _clientService: ClientsService, private _fb: FormBuilder) { }

  currentClient: Clients = {
    id: 0,
    nomecompleto : '',
    dtnascimento : '',
    sexo:'',
    telefones:'',
    cpf: '',
    email: '',
  }
  public display='none'; //modal
  public save = true;
  public update = false;
  public displayData: boolean;
  public clientFormGroup: FormGroup;
  public clients: Clients[];
  public client: Clients;

  public addtel: FormGroup;


  ngOnInit(): void{

    this.clientFormGroup = new FormGroup({
        nomecompleto : new FormControl(''),
        dtnascimento : new FormControl(''),
        sexo : new FormControl(''),
        cpf : new FormControl(''),
        email : new FormControl(''),
        telefones: new FormControl(''),
    });

    this.addtel = this._fb.group({
      itemTel: this._fb.array([this.initItemTel()])
    });
    this.getClients();
  }


  //chamada listar clientes do service
    getClients(){
        this._clientService.getClients()
        .subscribe(
          retorno =>{ this.clients = retorno.map (item =>{
            return new Clients(
              item.id,
              item.nomecompleto,
              item.dtnascimento,
              item.sexo,
              item.cpf,
              item.telefones,
              item.email
            )}
          )
        }
      )
    }

    //chamada cliente por id do service
    getClient(id) {
      this._clientService.getClient(id).subscribe(item => {
        this.client = item;
        this.displayData=true;
      });
    }

    //chamada adicionar cliente do service
    addClient() {

      this.clientFormGroup.value.telefones = [];
      let i=0
      for(let tel of this.addtel.value.itemTel){
        this.clientFormGroup.value.telefones[i] = tel;
        i = i + 1;
      }
      this._clientService.addClient(this.clientFormGroup.value)
      .subscribe(item => {
        this.client = item;
        console.log(this.client)
        this.getClients();
      })
      alert("Cadastrado com sucesso!!")

    }

    //chamada deletar clientes do service
    deleteClient(id) {
    this._clientService.deleteClient(id).subscribe(item => {
       this.getClients();
    });
  }

  //recebe os dados do cliente para jogar no form
  editClient(id) {
   this.update = true;
   this.save = false;
   this._clientService.getClient(id).subscribe(item => {
     this.currentClient = item;
     console.log(this.currentClient.telefones)
    });
    //abre modal
    this.display = "block";
  }


  //atualiza os dados
  updateClient(id) {
    this.clientFormGroup.value.telefones = [];
    let i=0
    for(let tel of this.addtel.value.itemTel){
      this.clientFormGroup.value.telefones[i] = tel;
      i = i + 1;
    }
    this._clientService.getClient(id).subscribe(item => {
      this.client = item;
      this.client.nomecompleto = this.clientFormGroup.value.nomecompleto;
      this.client.dtnascimento = this.clientFormGroup.value.dtnascimento;
      this.client.sexo = this.clientFormGroup.value.sexo;
      this.client.cpf = this.clientFormGroup.value.cpf;
      this.client.email = this.clientFormGroup.value.email;
      this.client.telefones = this.clientFormGroup.value.telefones;
      this._clientService.updateClient(this.client).subscribe(data1 => {
        this.getClients();
      });
    });

    alert("Atualizado com sucesso!!")
  }

  openModal(){
      this.display = "block";
      this.save = true;
      this.update = false;
  }

  closeModal(){ }


  //lista de telefones
  get formTel() {
    return this.addtel.get('itemTel') as FormArray;
  }

  initItemTel() {
    return this._fb.group({
      numero:[''],
    });
  }
  addNewTel() {
    this.formTel.push(this.initItemTel());
  }

  deleteTel(index: number) {
    this.formTel.removeAt(index);
  }

}
