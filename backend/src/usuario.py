
def getNextID():
    '''
    Retorna o id do proximo usuario no sistema, começando do 0.
    '''
    pass


class Usuario:
    def __init__(self, id=None):
        if id is not None:
            self.id = id
        else:
            self.id = getNextID()

    def pesquisarProjeto(self):
        pass


class UsuarioCadastrado(Usuario):
    def __init__(self, email, senha, nome, linkLattes, fotoPerfil, telefone, id=None):  # noqa 501
        super().__init__(id)
        self.email = email
        self.senha = senha
        self.nome = nome
        self.linkLattes = linkLattes if linkLattes is not None else None
        self.fotoPerfil = fotoPerfil if fotoPerfil is not None else None
        self.telefone = telefone if telefone is not None else None
