import requests
from usuario import Usuario, UsuarioCadastrado


class Central:
    def __init__(self):
        pass

    def login(user, password):
        '''
        Método que realiza o login de um usuário no sistema. Retorna null em
        caso de falha e um objeto do tipo usuário em caso de sucesso.
        '''
        '''
        user : string com a identificação do usuário (ra)
        password : string com a senha da DAC do usuário
        '''

        # Usa a api pra realizar autenticação
        json = {'username': user, 'password': password}
        response = requests.post(
            "https://sigpos-api-prod.d2d.ic.unicamp.br/login", json=json)

        # Se o login for um sucesso
        if (response.status_code == 200):
            pass
        # Se o login falhar
        else:
            pass
