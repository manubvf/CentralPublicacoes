import pandas as pd
import pymysql
import logging
from pymysql import connections
import sshtunnel
from sshtunnel import SSHTunnelForwarder

ssh_host = '143.106.73.33'
ssh_username = 'ubuntu'
ssh_password = 'jujuborina21'
database_username = 'dudoca'
database_password = 'Acabaxi_21'
database_name = 'db_teste'
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


def mysql_disconnect():
    """Closes the MySQL database connection.
    """

    connection.close()


def run_query(sql):
    """Runs a given SQL query via the global database connection.

    :param sql: MySQL query
    :return: Pandas dataframe containing results
    """

    return pd.read_sql_query(sql, connection)


open_ssh_tunnel()
connection = mysql_connect()
cursor = connection.cursor()
query = "INSERT INTO teste VALUES (3, 'Duzera')"
cursor.execute(query)
df = run_query("SELECT * FROM teste")
print(df)
mysql_disconnect()
close_ssh_tunnel()