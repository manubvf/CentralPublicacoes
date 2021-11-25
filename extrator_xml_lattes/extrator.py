# Jhessica Silva, 2021

import xml.etree.ElementTree as ET
import zipfile
from glob import glob
import os
import re

email_prof = {
'Flávio Keidi Miyazawa': 'fkm@ic.unicamp.br',
'André Santanchè': 'santanch@ic.unicamp.br',
'Ricardo Dahab': 'rdahab@ic.unicamp.br',
'Orlando Lee': 'lee@ic.unicamp.br',
'Alexandre Xavier Falcão': 'afalcao@ic.unicamp.br',
'Pedro Jussieu de Rezende': 'rezende@ic.unicamp.br',
'Juliana Freitag Borin': 'juliana@ic.unicamp.br',
'Claudia Maria Bauzer Medeiros': 'cmbm@ic.unicamp.br',
'Joao Meidanis': 'meidanis@ic.unicamp.br',
'Luiz Eduardo Buzato': 'buzato@ic.unicamp.br',
'Cid Carvalho de Souza': 'cid@ic.unicamp.br',
'Edson Borin': 'edson@ic.unicamp.br',
'Hervé Cédric Yviquel': 'herve.yviquel@ic.unicamp.br',
'Jacques Wainer': 'wainer@ic.unicamp.br',
'Anderson de Rezende Rocha': 'rocha@ic.unicamp.br',
'Julio César López Hernández': 'jlopez@ic.unicamp.br',
'Breno Bernard Nicolau de França': 'breno@ic.unicamp.br',
'Lehilton Lelis Chaves Pedrosa': 'lehilton@ic.unicamp.br',
'Jorge Stolfi': 'stolfi@ic.unicamp.br',
'Leandro Aparecido Villas': 'leandro@ic.unicamp.br',
'Gerberth Adín Ramírez Rivera': 'adin@ic.unicamp.br',
'Fábio Luiz Usberti': 'fusberti@ic.unicamp.br',
'Eduardo Candido Xavier': 'eduardo@ic.unicamp.br',
'Christiane Neme Campos': 'campos@ic.unicamp.br',
'Esther Luna Colombini': 'esther@ic.unicamp.br',
'Lucas Francisco Wanner': 'lucas@ic.unicamp.br',
'Ricardo Pannain': 'pannain@ic.unicamp.br',
'Paulo Cesar Centoducatte': 'ducatte@ic.unicamp.br',
'Sandro Rigo': 'sandro@ic.unicamp.br',
'Luiz Fernando Bittencourt': 'bit@ic.unicamp.br',
'Islene Calciolari Garcia': 'islene@ic.unicamp.br',
'Arthur João Catto': 'catto@ic.unicamp.br',
'Leonardo Montecchi': 'leonardo@ic.unicamp.br',
'Cecília Mary Fischer Rubira': 'cmrubira@ic.unicamp.br',
'Edmundo Roberto Mauro Madeira': 'edmundo@ic.unicamp.br',
'Nelson Luis Saldanha da Fonseca': 'nfonseca@ic.unicamp.br',
'Rafael Crivellari Saliba Schouery': 'rafael@ic.unicamp.br',
'Zanoni Dias': 'zanoni@ic.unicamp.br',
'Guido Costa Souza de Araújo': 'guido@ic.unicamp.br',
'Sandra Eliza Fontes de Avila': 'sandra@ic.unicamp.br',
'Paulo Lício de Geus': 'paulo@ic.unicamp.br',
'Julio Cesar dos Reis': 'jreis@ic.unicamp.br',
'Hélio Pedrini': 'helio@ic.unicamp.br',
'Guilherme Pimentel Telles': 'gpt@ic.unicamp.br',
'Rodolfo Jardim de Azevedo': 'rodolfo@ic.unicamp.br'
}

'''
CREATE TABLE `Usuario` (
  `idUsuario` INT(10) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `email_pessoal` VARCHAR(150) NULL,
  `email_institucional` VARCHAR(150) NOT NULL,
  `telefone` VARCHAR(12) NULL,
  `curso` VARCHAR(30) NULL,
  `lattes` VARCHAR(150) NULL,
  `research_gate` VARCHAR(150) NULL,
  `img_path` VARCHAR(200) NULL,
  PRIMARY KEY (`idUsuario`));
'''


lattes = glob(os.path.join(os.getcwd()+"/Lattes-professores", '*.zip'))
for cv in lattes:
	with zipfile.ZipFile(cv, 'r') as zip_ref:
		zip_ref.extractall(os.path.join(os.getcwd()+"/Lattes-professores"))

		xml_filename = "Lattes-professores/curriculo.xml"
 
		root = ET.parse(xml_filename).getroot()

		'''
		Estrutura dados_value
		0 - Nome completo
		1 - Link lattes
		'''

		dados_value = []

		lattes_link = "http://lattes.cnpq.br/"

		dados_value.append(root.find('./DADOS-GERAIS').attrib['NOME-COMPLETO'])
		dados_value.append(lattes_link+root.attrib['NUMERO-IDENTIFICADOR'])


		#print("**************************************************************************")

		#print(email_prof[dados_value[0]])


		print(f"INSERT INTO `Usuario` (`nome` , `senha`, `email_institucional`, `lattes`) VALUES ('{dados_value[0]}', 'prof_ic21!', '{email_prof[dados_value[0]]}', '{dados_value[1]}');\n")

		#se quiser pegar telefone:
		'''
		filtro = "*"
		for child in root.iter(filtro):
			pesquisa = ""
			if(child.tag=='ENDERECO'):
				for i in child.iter(filtro):
					if (i.tag=='ENDERECO-PROFISSIONAL'):
						print(f"{i.attrib['DDD']}{i.attrib['TELEFONE']}")
		'''


		#dados_value.append(root.find('./ENDERECO-PROFISSIONAL').attrib['DDD'])
		#print(dados_value[2])


		'''
		Estrutura projetos_de_pesquisa

		Cada posicao é uma pesquisa em andamento, composta por:
		Ano de inicio *** Nome do projeto *** Descricao do projeto *** Nome dos integrantes do projeto separados por virgulas
		'''

acc = 0
for cv in lattes:
	with zipfile.ZipFile(cv, 'r') as zip_ref:
		zip_ref.extractall(os.path.join(os.getcwd()+"/Lattes-professores"))

		xml_filename = "Lattes-professores/curriculo.xml"
 
		root = ET.parse(xml_filename).getroot()

		projetos_de_pesquisa = []
		
		filtro = "*"
		for child in root.iter(filtro):
			pesquisa = ""
			if(child.tag=='PARTICIPACAO-EM-PROJETO'):
				for j in child.iter(filtro):
					if(j.tag=='PROJETO-DE-PESQUISA' and j.attrib['SITUACAO']=='EM_ANDAMENTO'):
						dados_pesquisa_and = []
						pesquisa = pesquisa +j.attrib['ANO-INICIO']
						dados_pesquisa_and.append(j.attrib['ANO-INICIO'])
						pesquisa = pesquisa + " *** " +j.attrib['NOME-DO-PROJETO']
						dados_pesquisa_and.append(j.attrib['NOME-DO-PROJETO'])
						pesquisa = pesquisa + " *** " +j.attrib['DESCRICAO-DO-PROJETO']
						dados_pesquisa_and.append(j.attrib['DESCRICAO-DO-PROJETO'])
						
						if(len(dados_pesquisa_and)):
							print(f"INSERT INTO `Pesquisas` (`titulo`, `descricao`, `ano_inicio`, `ultima_atualizacao`) VALUES ('{dados_pesquisa_and[1]}', '{dados_pesquisa_and[2]}', '{dados_pesquisa_and[0]}', '2021-08-09');\n")

						for i in j.iter(filtro):
							if (i.tag=='INTEGRANTES-DO-PROJETO'):
								pesquisa = pesquisa + ", " +i.attrib['NOME-COMPLETO']
								
								
								if(email_prof.get(i.attrib['NOME-COMPLETO'], "dont")!="dont"):
									print(f"INSERT INTO `Autores` (`idUsuario`, `idPesquisa`, `nome`) VALUES ((SELECT `idUsuario` from `Usuario` WHERE `nome`= '{i.attrib['NOME-COMPLETO']}'), (SELECT `idPesquisa` from `Pesquisas` WHERE `titulo`='{dados_pesquisa_and[1]}'), '{i.attrib['NOME-COMPLETO']}');")
								else:
									print(f"INSERT INTO `Autores` (`idPesquisa`, `nome`) VALUES ((SELECT `idPesquisa` from `Pesquisas` WHERE `titulo`='{dados_pesquisa_and[1]}'), '{i.attrib['NOME-COMPLETO']}');")
								
								


						projetos_de_pesquisa.append(pesquisa)

		print("\n")

		#print(projetos_de_pesquisa)
		#print(len(projetos_de_pesquisa))
		acc = acc+len(projetos_de_pesquisa)


		
		'''
		Estrutura orientacoes_mestrado

		Cada posicao é um mestrado em andamento, composta por:
		Natureza *** Titulo do trabalho *** Ano de inicio *** Nome do orientando *** Nome da intituição *** Nome do curso *** 3 Palavras-chaves separadas por vírgulas
		'''
		'''
		orientacoes_mestrado = []

		filtro = "*"
		for child in root.iter(filtro):
			pesquisa = ""
			if(child.tag=='ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO'):
				pesquisa = pesquisa +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO').attrib['NATUREZA']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO').attrib['TITULO-DO-TRABALHO']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO').attrib['ANO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO').attrib['NOME-DO-ORIENTANDO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO').attrib['NOME-INSTITUICAO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-MESTRADO').attrib['NOME-CURSO']
				for i in child.iter(filtro):
					pesquisa = pesquisa + " *** "
					if (i.tag=='PALAVRAS-CHAVE'):
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-1']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-2']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-3']
				orientacoes_mestrado.append(pesquisa)

		#print(orientacoes_mestrado)
		#print(len(orientacoes_mestrado))

		orientacoes_doutorado = []

		filtro = "*"
		for child in root.iter(filtro):
			pesquisa = ""
			if(child.tag=='ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO'):
				pesquisa = pesquisa +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO').attrib['NATUREZA']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO').attrib['TITULO-DO-TRABALHO']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO').attrib['ANO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO').attrib['NOME-DO-ORIENTANDO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO').attrib['NOME-INSTITUICAO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-DOUTORADO').attrib['NOME-CURSO']
				for i in child.iter(filtro):
					pesquisa = pesquisa + " *** "
					if (i.tag=='PALAVRAS-CHAVE'):
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-1']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-2']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-3']
				orientacoes_doutorado.append(pesquisa)

		#print(orientacoes_doutorado)
		#print(len(orientacoes_doutorado))


		orientacoes_pos_doutorado = []

		filtro = "*"
		for child in root.iter(filtro):
			pesquisa = ""
			if(child.tag=='ORIENTACAO-EM-ANDAMENTO-DE-POS-DOUTORADO'):
				pesquisa = pesquisa +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-POS-DOUTORADO').attrib['NATUREZA']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-POS-DOUTORADO').attrib['TITULO-DO-TRABALHO']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-POS-DOUTORADO').attrib['ANO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-POS-DOUTORADO').attrib['NOME-DO-ORIENTANDO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-POS-DOUTORADO').attrib['NOME-INSTITUICAO']
				for i in child.iter(filtro):
					pesquisa = pesquisa + " *** "
					if (i.tag=='PALAVRAS-CHAVE'):
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-1']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-2']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-3']
				orientacoes_pos_doutorado.append(pesquisa)

		#print(orientacoes_pos_doutorado)
		#print(len(orientacoes_pos_doutorado))


		orientacoes_ic = []

		filtro = "*"
		for child in root.iter(filtro):
			pesquisa = ""
			if(child.tag=='ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA'):
				pesquisa = pesquisa +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA').attrib['NATUREZA']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA').attrib['TITULO-DO-TRABALHO']
				pesquisa = pesquisa+ " *** " +child.find('DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA').attrib['ANO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA').attrib['NOME-DO-ORIENTANDO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA').attrib['NOME-INSTITUICAO']
				pesquisa = pesquisa+ " *** " +child.find('DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-INICIACAO-CIENTIFICA').attrib['NOME-CURSO']
				for i in child.iter(filtro):
					pesquisa = pesquisa + " *** "
					if (i.tag=='PALAVRAS-CHAVE'):
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-1']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-2']
						pesquisa = pesquisa+ ", " +child.find('PALAVRAS-CHAVE').attrib['PALAVRA-CHAVE-3']
				orientacoes_ic.append(pesquisa)
		'''
		#print(orientacoes_ic)
		#print(len(orientacoes_ic))
		'''
		print("\n")
		print("Projetos de pesquisa: \n")
		print(projetos_de_pesquisa)
		print("\n")
		print("Orientações em andamento: \n")
		print("\n")
		print(orientacoes_mestrado)
		print("\n")
		print(orientacoes_doutorado)
		print("\n")
		print(orientacoes_pos_doutorado)
		print("\n")
		print(orientacoes_ic)
		'''
print(f"O numero de projetos de pesquisa encontrados foi: {acc}")