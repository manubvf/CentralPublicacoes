class Pesquisa:
    def __init__(self, autores, titulo, anoInicio, dataConclusao, ultimaAtualizacao, descricao, categoria, tags, status):
        self.autores = autores if autores is not None else []
        self.titulo = titulo
        self.anoInicio = anoInicio
        self.dataConclusao = dataConclusao 
        self.ultimaAtualizacao = ultimaAtualizacao if ultimaAtualizacao is not None else None
        self.descricao = descricao
        self.categoria = categoria if categoria is not None else None
        self.tags = tags if tags is not None else []
        self.status = status
        self.apoiadores = []

    @property
    def autores(self):
        return self.autores

    @autores.setter
    def autores(self, value):
        self.autores = value

    @property
    def titulo(self):
        return self.titulo

    @titulo.setter
    def titulo(self, value):
        self.titulo = value

    @property
    def anoInicio(self):
        return self.anoInicio

    @anoInicio.setter
    def anoInicio(self, value):
        self.anoInicio = value
    
    @property
    def dataConclusao(self):
        return self.dataConclusao

    @dataConclusao.setter
    def dataConclusao(self, value):
        self.dataConclusao = value

    @property
    def ultimaAtualizacao(self):
        return self.ultimaAtualizacao

    @ultimaAtualizacao.setter
    def ultimaAtualizacao(self, value):
        self.autoultimaAtualizacaores = value

    @property
    def descricao(self):
        return self.descricao

    @descricao.setter
    def descricao(self, value):
        self.descricao = value

    @property
    def categoria(self):
        return self.categoria

    @categoria.setter
    def categoria(self, value):
        self.categoria = value

    @property
    def tags(self):
        return self.tags

    @tags.setter
    def tags(self, value):
        self.tags = value

    @property
    def status(self):
        return self.status

    @status.setter
    def status(self, value):
        self.status = value

    @property
    def apoiadores(self):
        return self.apoiadores

    @apoiadores.setter
    def apoiadores(self, value):
        self.apoiadores = value