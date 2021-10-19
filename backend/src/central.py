import requests
# from usuario import Usuario, UsuarioCadastrado
# import pandas as pd
import pymysql
import logging
# from pymysql import connections
import sshtunnel
from sshtunnel import SSHTunnelForwarder

ssh_host = '143.106.73.33'
ssh_username = 'ubuntu'
ssh_password = 'jujuborina21'
database_username = 'dudoca'
database_password = 'Acabaxi_21'
database_name = 'db_central_ic'
localhost = '127.0.0.1'


def open_ssh_tunnel(verbose=False):
    """Open an SSH tunnel and connect using a username and password.

    :param verbose: Set to True to show logging
    :return tunnel: Global SSH tunnel connection
    """

    if verbose:
        sshtunnel.DEFAULT_LOGLEVEL = logging.DEBUG

    global tunnel
    tunnel = SSHTunnelForwarder(
        (ssh_host, 22),
        ssh_username=ssh_username,
        ssh_password=ssh_password,
        remote_bind_address=('127.0.0.1', 3306)
    )

    tunnel.start()


def close_ssh_tunnel():
    """Closes the SSH tunnel connection.
    """

    tunnel.close


def mysql_connect():
    """Connect to a MySQL server using the SSH tunnel connection

    :return connection: Global MySQL database connection
    """

    # global connection

    # connection = pymysql.connect(
    #    host='127.0.0.1',
    #    user=database_username,
    #    passwd=database_password,
    #    db=database_name,
    #    port=tunnel.local_bind_port
    # )

    return pymysql.connect(
        host='127.0.0.1',
        user=database_username,
        passwd=database_password,
        db=database_name,
        port=tunnel.local_bind_port
    )


def mysql_disconnect(connection):
    """Closes the MySQL database connection.
    """

    connection.close()


class Central:
    def __init__(self):
        pass

    def login(self, user, password):
        '''
        Método que realiza o login de um usuário no sistema. Retorna null em
        caso de falha e um objeto do tipo usuário em caso de sucesso.
        '''
        '''
        user : string com a identificação do usuário (ra)
        password : string com a senha da DAC do usuário
        '''
        open_ssh_tunnel()
        connection = mysql_connect()
        cursor = connection.cursor()
        query = "SELECT email_institucional, senha FROM Usuario WHERE email_institucional='" + \
            user + "' AND senha='" + password + "'"
        cursor.execute(query)
        # Checks if there is an entry on the table
        if (len(cursor.fetchall()) > 0):
            print("login realizado com sucesso!")
            logged = True
        else:
            print("usuario ou senha incorretos.")
            logged = False
        mysql_disconnect(connection)
        close_ssh_tunnel()
        return logged

    # Por enquanto o cadastro só pega o nome, senha e email
    # Cadastro ainda nao funciona kkkkk solucionar o insert no banco

    def cadastro(self, nome, senha, email_institucional):
        user = email_institucional.split('@')[0][1:]
        json = {'username': user, 'password': senha}
        response = requests.post(
            "https://sigpos-api-prod.d2d.ic.unicamp.br/login", json=json)

        if (response.status_code == 200):
            open_ssh_tunnel()
            connection = mysql_connect()
            cursor = connection.cursor()
            query = "SELECT * FROM Usuario"
            cursor.execute(query)
            next_id = len(cursor.fetchall()) + 1
            query = "INSERT INTO Usuario VALUES (" + str(next_id) + ", '" + nome + "', '" + \
                senha + "', NULL, '" + email_institucional + "', NULL, NULL, NULL, NULL, NULL)"
            cursor.execute(query)
            mysql_disconnect(connection)
            close_ssh_tunnel()
            print("Cadastro realizado com sucesso!")
        else:
            print("Email e senha não correspondem a nenhum aluno da dac.")
