export class CursoRequestDTO {
    constructor(dados) {
        const { nome, cargaHoraria, nivel, preco, ativo } = dados;
        this.erros = [];

        this.validaNome(nome);
        this.validaCargaHoraria(cargaHoraria);
        this.validaNivel(nivel);
        this.validaPreco(preco);
        this.validaAtivo(ativo);

        if (this.erros.length > 0) {
            const erroDeValidacao = new Error("Erro de validação dos dados");
            erroDeValidacao.listaErros = this.erros;
            throw erroDeValidacao;
        }

        delete this.erros;

        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.nivel = nivel;
        this.preco = preco;
        this.ativo = ativo;
    }
    
    validaNome(nome) {
        if (!nome || typeof nome !== 'string' || nome.trim().length <= 3 || nome.trim().length >= 80) {
            this.erros.push("O nome do curso deve ser uma string entre 3 e 80 caracteres.");
        }
    }

    validaCargaHoraria(cargaHoraria) {
        if (typeof cargaHoraria !== 'number' || cargaHoraria <= 20 || cargaHoraria >= 400) {
            this.erros.push("A carga horária deve ser um número positivo entre 20 e 400.");
        }
    }

    validaNivel(nivel) {
        if (!nivel || !["BASICO", "INTERMEDIARIO", "AVANCADO"].includes(nivel)) {
            this.erros.push("O nível do curso deve ser 'BASICO', 'INTERMEDIARIO' ou 'AVANCADO'.");
        }
    }

    validaPreco(preco) {
        if (typeof preco !== 'number' || preco <= 0) {
            this.erros.push("O preço deve ser um número positivo.");
        }
    }

    validaAtivo(ativo) {
        if (typeof ativo !== 'boolean') {
            this.erros.push("O status ativo deve ser um valor booleano (true ou false).");
        }
    }
}