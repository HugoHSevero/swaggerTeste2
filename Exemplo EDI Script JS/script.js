function lerArquivo() {
    const fileInput = document.getElementById('fileInput');
    const resultadoDiv = document.getElementById('resultado');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const conteudo = event.target.result;
        const informacoesSegmento000 = extrairInformacoesSegmento000(conteudo);
        const informacoesSegmento520 = extrairInformacoesSegmento520(conteudo);
        const informacoesSegmento521 = extrairInformacoesSegmento521(conteudo);
        const informacoesSegmento522 = extrairInformacoesSegmento522(conteudo);
        const informacoesSegmento523 = extrairInformacoesSegmento523(conteudo);
        const informacoesSegmento524 = extrairInformacoesSegmento524(conteudo);
        const informacoesSegmento525 = extrairInformacoesSegmento525(conteudo);
        const informacoesSegmento527 = extrairInformacoesSegmento527(conteudo);
        const informacoesSegmento529 = extrairInformacoesSegmento529(conteudo);
        
        // Limpar o conteúdo anterior antes de exibir o resultado
        resultadoDiv.innerHTML = '';

        // Exibir as informações dos segmentos na tela
        const informacoesDiv = document.createElement('div');

        const segmento000Div = criarDivComInformacoes('Segmento 000', informacoesSegmento000);
        informacoesDiv.appendChild(segmento000Div);

        for (const segmento520 of informacoesSegmento520) {
            const segmento520Div = criarDivComInformacoes('Segmento 520', segmento520);
            informacoesDiv.appendChild(segmento520Div);
        }

        for (const segmento521 of informacoesSegmento521) {
            const segmento521Div = criarDivComInformacoes('Segmento 521', segmento521);
            informacoesDiv.appendChild(segmento521Div);
        }

        for (const segmento522 of informacoesSegmento522) {
            const segmento522Div = criarDivComInformacoes('Segmento 522', segmento522);
            informacoesDiv.appendChild(segmento522Div);
        }

        for (const segmento523 of informacoesSegmento523) {
            const segmento523Div = criarDivComInformacoes('Segmento 523', segmento523);
            informacoesDiv.appendChild(segmento523Div);
        }

        for (const segmento524 of informacoesSegmento524) {
            const segmento524Div = criarDivComInformacoes('Segmento 524', segmento524);
            informacoesDiv.appendChild(segmento524Div);
        }

        for (const segmento525 of informacoesSegmento525) {
            const segmento525Div = criarDivComInformacoes('Segmento 525', segmento525);
            informacoesDiv.appendChild(segmento525Div);
        }

        for (const segmento527 of informacoesSegmento527) {
            const segmento527Div = criarDivComInformacoes('Segmento 527', segmento527);
            informacoesDiv.appendChild(segmento527Div);
        }

        for (const segmento529 of informacoesSegmento529) {
            const segmento529Div = criarDivComInformacoes('Segmento 529', segmento529);
            informacoesDiv.appendChild(segmento529Div);
        }

        resultadoDiv.appendChild(informacoesDiv);
    };

    reader.readAsText(file);
}

function extrairInformacoesSegmento000(conteudo) {
    const linhaSegmento000 = conteudo.split('\n').find(linha => linha.startsWith('000'));

    if (linhaSegmento000) {
        const identificadorRegistro = linhaSegmento000.slice(0, 3);
        const remetente = linhaSegmento000.slice(3, 38).trim(); // Adicionado +1 ao tamanho do campo Remetente
        const destinatario = linhaSegmento000.slice(38, 73).trim(); // Adicionado +1 ao tamanho do campo Destinatário
        const data = linhaSegmento000.slice(73, 79);
        const hora = linhaSegmento000.slice(79, 83);
        const identificacaoIntercambio = linhaSegmento000.slice(83, 95);
        const filler = linhaSegmento000.slice(95, 254);

        return {
            'Identificador de Registro': identificadorRegistro,
            'Remetente': remetente,
            'Destinatário': destinatario,
            'Data': data,
            'Hora': hora,
            'Identificação do Intercâmbio': identificacaoIntercambio,
            'Filler': filler
        };
    }

    return {};
}

function extrairInformacoesSegmento520(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento520s = [];

    for (const linha of linhas) {
        if (linha.startsWith('520')) {
            const identificadorRegistro = linha.slice(0, 3);
            const identificacaoDocumento = linha.slice(3, 17);
            const filler = linha.slice(17, 332); // Adicionado +1 ao tamanho do campo Filler

            segmento520s.push({
                'Identificador de Registro': identificadorRegistro,
                'Identificação do Documento': identificacaoDocumento,
                'Filler': filler.trim() // Remover espaços em branco do Filler
            });
        }
    }

    return segmento520s;
}

function extrairInformacoesSegmento521(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento521s = [];

    for (const linha of linhas) {
        if (linha.startsWith('521')) {
            const identificadorRegistro = linha.slice(0, 3);
            const cnpjTransportadora = linha.slice(3, 17);
            const nomeTransportadora = linha.slice(17, 67).trim(); // Adicionado +1 ao tamanho do campo Nome da Transportadora
            const filler = linha.slice(67, 282); // Adicionado +1 ao tamanho do campo Filler

            segmento521s.push({
                'Identificador de Registro': identificadorRegistro,
                'CNPJ da Transportadora': cnpjTransportadora,
                'Nome da Transportadora': nomeTransportadora,
                'Filler': filler.trim() // Remover espaços em branco do Filler
            });
        }
    }

    return segmento521s;
}

function extrairInformacoesSegmento522(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento522s = [];
    let segmento522 = {};

    for (const linha of linhas) {
        if (linha.startsWith('522')) {
            segmento522 = {
                'Identificador de Registro': linha.slice(0, 3),
                'Filial Emissora do Conhecimento': linha.slice(3, 13).trim(),
                'Série do Conhecimento': linha.slice(13, 18).trim(),
                'Número do Conhecimento': linha.slice(18, 30).trim(),
                'Data de Emissão do Conhecimento': linha.slice(30, 38),
                'Condição de Frete': linha.slice(38, 39),
                'CNPJ do Local/Filial Emissora do Conhecimento': linha.slice(39, 53).trim(),
                'CNPJ do Emissor da Nota Fiscal': linha.slice(53, 67).trim(),
                'CNPJ do Destino do Conhecimento de Devolução': linha.slice(67, 81).trim(),
                'CNPJ do Destinatário das Notas do Conhecimento': linha.slice(81, 95).trim(),
                'CNPJ do Consignatário': linha.slice(95, 109).trim(),
                'Código Fiscal da Natureza da Operação': linha.slice(109, 114).trim(),
                'Placa do Veículo': linha.slice(114, 123).trim(),
                'Número Romaneio, Ordem de Coleta, Resumo de Carga, etc.': linha.slice(123, 143).trim(),
                'Número SAP, Shipment, etc. (Identificação do Embarque, Carga, etc.) - #1': linha.slice(143, 163).trim(),
                'Outro Número SAP, Account, etc. (Identificação do Embarque, Carga, etc.) - #2': linha.slice(163, 183).trim(),
                'Outro Número SAP, Account, etc. (Identificação do Embarque, Carga, etc.) - #3': linha.slice(183, 203).trim(),
                'Identificação do Documento de Autorização de Carregamento e Transporte da Transportadora': linha.slice(203, 218).trim(),
                'Chave de Consulta com DV': linha.slice(218, 263).trim(),
                'Protocolo': linha.slice(263, 278).trim(),
                'Código Numérico da Chave de Acesso': linha.slice(278, 287).trim(),
                'Filial Emissora do Conhecimento Originador do Conhecimento - Transportadora Contratante': linha.slice(287, 297).trim(),
                'Série do Conhecimento Originador do Conhecimento - Transportadora Contratante': linha.slice(297, 302).trim(),
                'Número do Conhecimento Originador deste Conhecimento - Transportadora Contratante': linha.slice(302, 314).trim(),
                'Tipo do Meio de Transporte': linha.slice(314, 319).trim(),
                'Tipo do Conhecimento': linha.slice(319, 320),
                'Tipo de Frete': linha.slice(320, 321),
                'Ação do Documento': linha.slice(321, 322),
                'Cálculo de Frete Diferenciado?': linha.slice(322, 323),
                'Tabela de Frete': linha.slice(323, 333).trim(),
                'Plano de Carga Rápida (S/N)?': linha.slice(333, 334),
                'UF do Embarcador - Local de Coleta': linha.slice(334, 336).trim(),
                'UF da Unidade Emissora do Conhecimento': linha.slice(336, 338).trim(),
                'UF do Destinatário/Local de Entrega da Mercadoria/Nota Fiscal': linha.slice(338, 340).trim(),
                'Filler': linha.slice(340, 350).trim()
            };

            segmento522s.push(segmento522);
        }
    }

    return segmento522s;
}

function extrairInformacoesSegmento523(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento523s = [];
    let segmento523 = {};

    for (const linha of linhas) {
        if (linha.startsWith('523')) {
            segmento523 = {
                'Identificador de Registro': linha.slice(0, 3),
                'Quantidade Total de Volumes/Embalagens': linha.slice(3, 9).trim(),
                'Peso Total Transportado (Peso Bruto)': linha.slice(9, 15).trim(),
                'Peso Total Cubado (Volume x Densidade)': linha.slice(15, 21).trim(),
                'Peso Densidade/Cubagem': linha.slice(21, 27).trim(),
                'Valor Total do Frete': linha.slice(27, 40).trim(),
                'Valor do Frete por Peso/Volume': linha.slice(40, 53).trim(),
                'Frete Valor': linha.slice(53, 66).trim(),
                'Frete Ad Valorem': linha.slice(66, 79).trim(),
                'Valor Sec - CAT': linha.slice(79, 92).trim(),
                'Valor ITR': linha.slice(92, 105).trim(),
                'Valor do Despacho': linha.slice(105, 118).trim(),
                'Valor do Pedágio': linha.slice(118, 131).trim(),
                'Valor ADEME/GRIS': linha.slice(131, 144).trim(),
                'Valor Total de Despesas Extras/Adicionais': linha.slice(144, 157).trim(),
                'Valor do Desconto ou do Acréscimo': linha.slice(157, 170).trim(),
                'Indicador de Desconto ou Acréscimo': linha.slice(170, 171).trim(),
                'Base de Cálculo para Apuração ICMS': linha.slice(171, 184).trim(),
                '% de Taxa do ICMS': linha.slice(184, 190).trim(),
                'Valor do ICMS': linha.slice(190, 203).trim(),
                'Substituição Tributária': linha.slice(203, 204).trim(),
                'Base de Cálculo ICMS - Substituição Tributária': linha.slice(204, 217).trim(),
                '% de Taxa do ICMS - Substituição Tributária': linha.slice(217, 223).trim(),
                'Valor do ICMS - Substituição Tributária': linha.slice(223, 236).trim(),
                'Base de Cálculo do ISS': linha.slice(236, 249).trim(),
                '% de Taxa do ISS': linha.slice(249, 255).trim(),
                'Valor do ISS': linha.slice(255, 268).trim(),
                'Valor do IR': linha.slice(268, 281).trim(),
                'Direito Fiscal': linha.slice(281, 284).trim(),
                'Tipo de Imposto': linha.slice(284, 288).trim()
            };

            segmento523s.push(segmento523);
        }
    }

    return segmento523s;
}

function extrairInformacoesSegmento524(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento524s = [];
    let segmento524 = {};

    for (const linha of linhas) {
        if (linha.startsWith('524')) {
            segmento524 = {
                'Identificador de Registro': linha.slice(0, 3),
                'CNPJ do Emissor da Nota Fiscal': linha.slice(3, 17).trim(),
                'Número da Nota Fiscal': linha.slice(17, 26).trim(),
                'Série': linha.slice(26, 29).trim(),
                'Data de Emissão da Nota Fiscal': linha.slice(29, 37),
                'Valor da Nota Fiscal': linha.slice(37, 50),
                'Qtde Total de Volumes/Embalagens': linha.slice(50, 56),
                'Peso Bruto Total da Mercadoria/Nota': linha.slice(56, 62),
                'Peso Densidade/Cubagem': linha.slice(62, 68),
                'Peso Cubado (Volume x Densidade)': linha.slice(68, 74),
                'Identificação do Pedido do Cliente': linha.slice(74, 94).trim(),
                'Número Romaneio, Ordem de Coleta': linha.slice(94, 114).trim(),
                'Número SAP, Shipment, Etc. (#1)': linha.slice(114, 134).trim(),
                'Outro Número SAP, Account, Etc. (#2)': linha.slice(134, 154).trim(),
                'Outro Número SAP, Account, Etc. (#3)': linha.slice(154, 174).trim(),
                'Nota Fiscal de Devolução?': linha.slice(174, 175),
                'Tipo da Nota Fiscal': linha.slice(175, 176),
                'Indicação de Bonificação': linha.slice(176, 177),
                'Código Fiscal de Operação (CFOP)': linha.slice(177, 181),
                'Sigla do Estado (UF) do Fato Gerador': linha.slice(181, 183).trim(),
                'Desdobro': linha.slice(183, 193).trim()
            };

            segmento524s.push(segmento524);
        }
    }

    return segmento524s;
}

function extrairInformacoesSegmento525(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento525s = [];
    let segmento525 = {};

    for (const linha of linhas) {
        if (linha.startsWith('525')) {
            segmento525 = {
                'Identificador de Registro': linha.slice(0, 3),
                'Entrega Casada - CNPJ/CGC Emissor da Nota 1': linha.slice(3, 17).trim(),
                'Entrega Casada - Nome do Emissor da Nota 1': linha.slice(17, 67).trim(),
                'Entrega Casada - Série da Nota Fiscal 1': linha.slice(67, 70).trim(),
                'Entrega Casada - Número da Nota Fiscal 1': linha.slice(70, 79).trim(),
                'Entrega Casada - CNPJ/CGC Emissor da Nota 2': linha.slice(79, 93).trim(),
                'Entrega Casada - Nome do Emissor da Nota 2': linha.slice(93, 143).trim(),
                'Entrega Casada - Série da Nota Fiscal 2': linha.slice(143, 146).trim(),
                'Entrega Casada - Número da Nota Fiscal 2': linha.slice(146, 155).trim(),
                'Entrega Casada - CNPJ/CGC Emissor da Nota 3': linha.slice(155, 169).trim(),
                'Entrega Casada - Nome do Emissor da Nota 3': linha.slice(169, 219).trim(),
                'Entrega Casada - Série da Nota Fiscal 3': linha.slice(219, 222).trim(),
                'Entrega Casada - Número da Nota Fiscal 3': linha.slice(222, 231).trim(),
                'Redespacho - Filial Emissora do Conhecimento': linha.slice(231, 241).trim(),
                'Redespacho - Série do Conhecimento': linha.slice(241, 246).trim(),
                'Redespacho - Número do Conhecimento': linha.slice(246, 258).trim(),
                'Redespacho - CNPJ/CGC da Transportadora Contratante': linha.slice(258, 272).trim()
            };

            segmento525s.push(segmento525);
        }
    }

    return segmento525s;
}

function extrairInformacoesSegmento527(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento527s = [];
    let segmento527 = {};

    for (const linha of linhas) {
        if (linha.startsWith('527')) {
            segmento527 = {
                'Identificador de Registro': linha.slice(0, 3),
                'Razão Social': linha.slice(3, 63).trim(),
                'CNPJ (CGC)': linha.slice(63, 77).trim(),
                'Inscrição Estadual': linha.slice(77, 92).trim(),
                'Endereço (Logradouro)': linha.slice(92, 152).trim(),
                'Bairro': linha.slice(152, 187).trim(),
                'Cidade (Município)': linha.slice(187, 222).trim(),
                'Código Postal': linha.slice(222, 231).trim(),
                'Código de Município': linha.slice(231, 240).trim(),
                'UF': linha.slice(240, 249).trim(),
                'Número de Comunicação': linha.slice(249, 284).trim()
            };

            segmento527s.push(segmento527);
        }
    }

    return segmento527s;
}

function extrairInformacoesSegmento529(conteudo) {
    const linhas = conteudo.split('\n');
    const segmento529s = [];
    let segmento529 = {};

    for (const linha of linhas) {
        if (linha.startsWith('529')) {
            segmento529 = {
                'Identificador de Registro': linha.slice(0, 3),
                'Quantidade Total de Conhecimentos': linha.slice(3, 7).trim(),
                'Valor Total dos Conhecimentos': linha.slice(7, 22).trim(),
                'Filler': linha.slice(22, 327)
            };

            segmento529s.push(segmento529);
        }
    }

    return segmento529s;
}

function criarDivComInformacoes(titulo, informacoes) {
    const informacoesDiv = document.createElement('div');
    const tituloH2 = document.createElement('h2');
    tituloH2.textContent = titulo;
    informacoesDiv.appendChild(tituloH2);

    for (const [chave, valor] of Object.entries(informacoes)) {
        const p = document.createElement('p');
        p.textContent = `${chave}: ${valor}`;
        informacoesDiv.appendChild(p);
    }

    return informacoesDiv;
}
