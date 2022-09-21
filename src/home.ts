type Recado ={
    id: number,
    recado: string,
    descricao: string,
}

let usuarioLogado:UsuarioOn =  JSON.parse(localStorage.getItem('userLogado')|| '[]')

imprimirRecados()


if (!usuarioLogado) {
    sair();
}

let recado = document.getElementById('recado') as HTMLInputElement;
let descricao = document.getElementById('descricao') as HTMLInputElement;
const btnGravar = document.getElementById('btnGravar') as HTMLButtonElement;
let form = document.getElementById('formulario') as HTMLFormElement;
const btnSair = document.getElementById('btnSair') as HTMLButtonElement

btnSair.addEventListener('click', () => {
    const usuarios:Usuario[] = JSON.parse(localStorage.getItem('usuarios')|| '[]');
    
    const indice = usuarios.findIndex((usurario) => usurario.idConta === usuarioLogado.idConta);

    usuarios[indice].recados= usuarioLogado.recados;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    localStorage.removeItem('userLogado');
    sair();
  });

btnGravar.addEventListener('click', (event) =>{
    event.preventDefault();
    gravarRecado();
})

function sair() {
    return (window.location.href = 'login.html');
  }

function gravarRecado() {
    if(!recado.value || !descricao.value){
        alertBootstrap('Campos vazios!','danger')
        return
    }

    const id = Math.floor(Math.random() * (1000 - 10) + 10);
    const newRecado = {
        id,
        recado: recado.value,
        descricao: descricao.value
    }

    usuarioLogado.recados.push(newRecado)
    localStorage.setItem("userLogado", JSON.stringify(usuarioLogado))
    // limparRecado()
    imprimirRecados()
}

// function limparRecado() {
    
// }

function imprimirRecados() {
    let tabela = document.getElementById('table') as HTMLTableElement;
    tabela.innerHTML = '';

    for(let i in usuarioLogado.recados) {
        const index = Number(i)+1
        let tr = tabela.insertRow();
    
        let td_id = tr.insertCell();
        let td_recado = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_acao = tr.insertCell(); 

        td_id.innerHTML= String(index);
        td_recado.innerHTML = usuarioLogado.recados[i].recado;
        td_descricao.innerHTML = usuarioLogado.recados[i].descricao;
       
        let btnEditar = document.createElement("button")  
        btnEditar.textContent = 'Editar';
        btnEditar.setAttribute('class','btn btn-outline-success')
        btnEditar.setAttribute('data-bs-toggle',"modal")
        btnEditar.setAttribute('data-bs-target', '#modalEditar')
        btnEditar.addEventListener('click', () => editarRecado(usuarioLogado.recados[i].id));

        let btnExcluir = document.createElement("button")  
        btnExcluir.textContent = 'Excluir';
        btnExcluir.setAttribute('class','btn btn-outline-danger')
        btnExcluir.setAttribute('data-bs-toggle',"modal")
        btnExcluir.setAttribute('data-bs-target', '#modalApagar')
        btnExcluir.addEventListener('click', () => deletarRecado(usuarioLogado.recados[i].id));

        td_acao.appendChild(btnEditar)
        td_acao.appendChild(btnExcluir)
        
        tabela.appendChild(tr)
        

        
    }

}
 
function editarRecado(msg: number){
    let recado = (document.getElementById('modalRecado') as HTMLInputElement);
    let descricao = (document.getElementById('modalDescricao') as HTMLInputElement);
    

    const procuraRecado = usuarioLogado.recados.findIndex((recado) => recado.id === msg);

    if(procuraRecado !== -1){
        recado.value = usuarioLogado.recados[procuraRecado].recado

        descricao.value = usuarioLogado.recados[procuraRecado].descricao
    
        const confirmSave = document.getElementById('confirm-save') as HTMLButtonElement;
    
        confirmSave.onclick = ()=>{
            usuarioLogado.recados[procuraRecado].recado = recado.value
            usuarioLogado.recados[procuraRecado].descricao = descricao.value

            alertBootstrap('Editado com sucesso','success')
            
            localStorage.setItem("userLogado", JSON.stringify(usuarioLogado))
            imprimirRecados()
        }
    }

    

}
  
function deletarRecado(id: number){
    const confirmApagar = document.getElementById('confirm-delete') as HTMLButtonElement;
    confirmApagar.onclick = ()=>{
        const deletarRecados = usuarioLogado.recados.filter((recado: { id: number; }) => recado.id !== id);
        usuarioLogado.recados = deletarRecados
        localStorage.setItem("userLogado", JSON.stringify(usuarioLogado))
        imprimirRecados();
    }
}

