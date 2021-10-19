
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

    @property
    def email(self):
        return self.email

    @email.setter
    def email(self, value):
        self.email = value

    @property
    def senha(self):
        return self.senha

    @senha.setter
    def senha(self, value):
        self.senha = value

    @property
    def nome(self):
        return self.nome

    @nome.setter
    def nome(self, value):
        self.nome = value

    @property
    def linkLattes(self):
        return self.linkLattes

    @linkLattes.setter
    def linkLattes(self, value):
        self.linkLattes = value

    @property
    def fotoPerfil(self):
        return self.fotoPerfil

    @fotoPerfil.setter
    def fotoPerfil(self, value):
        self.fotoPerfil = value

    @property
    def telefone(self):
        return self.telefone

    @telefone.setter
    def telefone(self, value):
        self.telefone = value

    @property
    def id(self):
        return self.id
