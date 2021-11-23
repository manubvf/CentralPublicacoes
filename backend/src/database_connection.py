# import requests
import pymysql
import logging
import sshtunnel
from sshtunnel import SSHTunnelForwarder


class DatabaseConnection:

    ssh_host = '143.106.73.33'
    ssh_username = 'ubuntu'
    ssh_password = 'jujuborina21'
    database_username = 'dudoca'
    database_password = 'Acabaxi_21'
    database_name = 'db_central_ic'
    localhost = '127.0.0.1'

    def open_ssh_tunnel(self, verbose=False):
        """Open an SSH tunnel and connect using a username and password.

        :param verbose: Set to True to show logging
        :return tunnel: Global SSH tunnel connection
        """

        if verbose:
            sshtunnel.DEFAULT_LOGLEVEL = logging.DEBUG

        global tunnel
        self.tunnel = SSHTunnelForwarder(
            (self.ssh_host, 22),
            ssh_username=self.ssh_username,
            ssh_password=self.ssh_password,
            remote_bind_address=('127.0.0.1', 3306)
        )

        self.tunnel.start()

    def close_ssh_tunnel(self):
        """Closes the SSH tunnel connection.
        """
        self.tunnel.close()

    def mysql_connect(self):
        """Connect to a MySQL server using the SSH tunnel connection

        :return connection: Global MySQL database connection
        """

        return pymysql.connect(
            host='127.0.0.1',
            user=self.database_username,
            passwd=self.database_password,
            db=self.database_name,
            port=self.tunnel.local_bind_port
        )

    def mysql_disconnect(self):
        """Closes the MySQL database connection.
        """
        self.connection.close()

    def __init__(self):
        self.open_ssh_tunnel()
        self.connection = self.mysql_connect()

    def close_all(self):
        self.connection.close()
        self.close_ssh_tunnel()
