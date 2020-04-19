import { Component, OnInit } from '@angular/core';
import { Clients } from '../clients';
import { ClientsService } from '../clients.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})


export class ClientsComponent implements OnInit {
  constructor(private _clientService: ClientsService) { }

  currentClient: Clients = {
    id: 0,
    nomecompleto : '',
    dtnascimento : '',
    sexo:'',
    telefone:'',
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

  ngOnInit(): void{

    this.clientFormGroup = new FormGroup(
      {
        nomecompleto : new FormControl(''),
        dtnascimento : new FormControl(''),
        sexo : new FormControl(''),
        cpf : new FormControl(''),
        email : new FormControl(''),
        telefone : new FormControl('')
      },
    );

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
              item.telefone,
              item.email
            )}
          )
        }
      )
    }

    fetchId = 0;
    //chamada cliente por id do service
    getClient() {
      this._clientService.getClient(this.fetchId).subscribe(item => {
        this.client = item;
        this.displayData=true;
      });
    }

    //chamada adicionar cliente do service
    addClient() {
      this._clientService.addClient(this.clientFormGroup.value)
      .subscribe(item => {
        this.client = item;
        console.log(this.client)
        this.getClients();
      })
      this.closeModal()

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
    });
    //abre modal
    this.display = "block";
  }


  //atualiza os dados
  updateClient(id) {
    this._clientService.getClient(id).subscribe(item => {
      this.client = item;
      this.client.nomecompleto = this.clientFormGroup.value.nomecompleto;
      this.client.dtnascimento = this.clientFormGroup.value.dtnascimento;
      this.client.sexo = this.clientFormGroup.value.sexo;
      this.client.cpf = this.clientFormGroup.value.cpf;
      this.client.email = this.clientFormGroup.value.email;
      this.client.telefone = this.clientFormGroup.value.telefone;
      this._clientService.updateClient(this.client).subscribe(data1 => {
        this.getClients();
      });
    });
    this.closeModal();
  }

  openModal(){
      this.display = "block";
      this.save = true;
      this.update = false;
  }

  closeModal(){ }

}
