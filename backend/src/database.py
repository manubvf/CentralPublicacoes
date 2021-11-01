# import requests
import pymysql
import logging
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


def read_db(op, args):
    '''Perform a read (SELECT) operation on the database and returns the result.
    '''
    '''
    op: identifies the desired operation (SELECT parameters).
    args: list of parameters.
    '''
    open_ssh_tunnel()
    connection = mysql_connect()
    cursor = connection.cursor()

    # op 0 performs a search with email and password (login)
    if op == 0:
        query = "SELECT email_institucional, senha FROM Usuario WHERE email_institucional='" + \
            args[0] + "' AND senha='" + args[1] + "'"
        cursor.execute(query)
        ret = cursor.fetchall()

    mysql_disconnect(connection)
    close_ssh_tunnel()

    return ret
