class UserPage < SitePrism::Page
    set_url 'http://10.72.251.134/#/inicio'

    element :numero, '#numeroBoInput'
    element :ano_bo, '#anoBoInput'
    element :delegacia, '#delegaciaCompleteInput'
    element :op_delegacia, 'li', text: 'DEL POL PRAIA GRANDE'
    element :op_del_errada, 'ul > li.group-last.ivu-menu-item-group', text: '01º D P  PRAIA GRANDE'
    element :pesquisar, '#pesquisar > span > span > i'
    element :visual_dossie, :link, '- Roubo (art. 157)'
    #element :visual_dossie, :xpath, "//tr/td[3]/div/a"
    element :leia_mais, '#leiamais'
    element :esconder, '#esconder'
    element :natureza_bo, 'span.font-weight-bold', text: 'Natureza'
    element :partes, 'span.font-weight-bold', text: 'Partes envolvidas'
    element :envolvidos, 'span.font-weight-bold', text: 'Veículos envolvidos'
    element :aut_rec, 'span.font-weight-bold', text: 'Auto de reconhecimento fotográfico'
    element :btn_eye, :xpath, "//table/tbody/tr[1]/td[@class='ivu-table-column-left'][4]/div/div/button"
    element :partes_vitima, 'span', text: 'ELLEN SANTOS DE SOUZA'
    element :partes_autor, 'span', text: "AUTOR"
    element :mapa, 'span.font-weight-bold', text: 'Mapa das ocorrências semelhantes'
    element :marcadores, :xpath, "//div[2]/div/span"
    #element :atual, '#atual'
    #element :semelhante, '#semelhante'
    #element :conhecido, 'conhecido'

    #validates :historico, length: { maximum: 200 }

    #validates_size_of

   
    def preencher_numero
        numero.set '2592'
    end

    def preencher_numero_errado
        numero.set '2500'
    end

    def preencher_numero_completo
        numero.set '1099'
    end

    def preencher_numero_rdo
        numero.set '5759'
    end

    def preencher_ano_bo
        ano_bo.set '2018'
    end

    def preencher_ano_bo_errado
        ano_bo.set '2017'
    end

    def clicar_delegacia
        delegacia.click
    end

    def preencher_delegacia
        delegacia.set 'PRAIA GRANDE'
    end

    def preencher_delegacia_errada
        delegacia.set 'DEL UBATUBA PRAIA OPER VERÃO'
    end

    def sel_op_delegacia
        op_delegacia.click
    end

    def visualizar_dossie
        visual_dossie.click
    end

    def pesquisar_ocorrencia
        pesquisar.click
    end

    def hist_leia_mais
        leia_mais.click
    end

    def hist_esconder
        esconder.click
    end

    def natureza
        natureza_bo.click
    end

    def partes_env
        partes.click
    end

    def veiculos_env
        envolvidos.click
    end

    def aut_rec_fot
        aut_rec.click
    end

    def clicar_auto_rec
        btn_eye.double_click
    end

    def visualizar_vitima
        partes_vitima.click
    end

    def visualizar_autor
        partes_autor.click
    end

    def visualizar_mapa
        mapa.click
    end

    def set_marcadores
        marcadores.click
    end

end