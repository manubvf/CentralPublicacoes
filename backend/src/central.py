import requests
# from usuario import Usuario, UsuarioCadastrado
# import pandas as pd
# from pymysql import connections
import database


class Central:
    def __init__(self):
        pass

    @staticmethod
    def login(user, password):
        '''
        Método que realiza o login de um usuário no sistema. Retorna null em
        caso de falha e um objeto do tipo usuário em caso de sucesso.
        '''
        '''
        user : string com a identificação do usuário (ra)
        password : string com a senha da DAC do usuário
        '''
        login_info = [user, password]
        data = database.read_db(0, login_info)
        # Checks if there is an entry on the table
        if len(data) > 0:
            ret = {'token': 'LKJHGFDSA'}
        else:
            ret = {'error': 'user not found'}

        return ret

    # Por enquanto o cadastro só pega o nome, senha e email
    # Cadastro ainda nao funciona kkkkk solucionar o insert no banco

    def cadastro(self, nome, senha, email_institucional):
        user = email_institucional.split('@')[0][1:]
        json = {'username': user, 'password': senha}
        response = requests.post(
            "https://sigpos-api-prod.d2d.ic.unicamp.br/login", json=json)

        if (response.status_code == 200):
            # open_ssh_tunnel()
            # connection = mysql_connect()
            # cursor = connection.cursor()
            # query = "SELECT * FROM Usuario"
            # cursor.execute(query)
            # next_id = len(cursor.fetchall()) + 1
            # query = "INSERT INTO Usuario VALUES (" + str(next_id) + ", '" + nome + "', '" + \
            #    senha + "', NULL, '" + email_institucional + "', NULL, NULL, NULL, NULL, NULL)"
            # cursor.execute(query)
            # mysql_disconnect(connection)
            # close_ssh_tunnel()
            print("Cadastro realizado com sucesso!")
        else:
            print("Email e senha não correspondem a nenhum aluno da dac.")
