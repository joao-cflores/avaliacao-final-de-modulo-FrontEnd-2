
type UsuarioOn = {
    usuario: string,
    idConta: number,
    recados: Recado[],
}


let usuarioLogin = document.getElementById('usuarioLogin') as HTMLInputElement;
let labelUsuario = document.getElementById('labelUser') as HTMLLabelElement;
let senhaLogin = document.getElementById('senhaLogin') as HTMLInputElement;
let labelSenhaUser = document.getElementById('labelSenha') as HTMLLabelElement;
const btnEntrar = document.getElementById('btnEntrar') as HTMLButtonElement;
let listUsuarios: any[] = []


listUsuarios = JSON.parse(localStorage.getItem('usuarios') || "[]")


btnEntrar.addEventListener('click', (event) => {
    event.preventDefault();
    logar();
})

function logar(){

if(!usuarioLogin.value && !senhaLogin.value){
    labelUsuario.setAttribute('style', 'color: red')
    usuarioLogin.setAttribute('style', 'color: red')
    labelSenhaUser.setAttribute('style', 'color: red')
    senhaLogin.setAttribute('style', 'color: red')
    alert("Usuário ou senha estão vazios! Confira se você está cadastrado.")

} else {
    const item = listUsuarios.find((value) => value.usuario === usuarioLogin.value && value.senha === senhaLogin.value)
    
    if (item===undefined){
        labelUser.setAttribute('style', 'color: red')
        usuarioLogin.setAttribute('style', 'color: red')
        labelSenhaUser.setAttribute('style', 'color: red')
        senhaLogin.setAttribute('style', 'color: red')
        alert('Usuário não encontrado! Cadastre-se')
        return
    }
    const usuarioValido:UsuarioOn = {
        idConta: item.idConta,
        usuario: item.usuario,
        recados: item.recados,
    }
    
    localStorage.setItem('userLogado', JSON.stringify(usuarioValido))
    window.location.href = 'home.html'
    
}

}