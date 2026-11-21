(() => {
  const formCard = document.getElementById('form-card');
  const formTitle = document.getElementById('form-title');
  const form = document.getElementById('lembranca-form');
  const inputNome = document.getElementById('nome');
  const inputDescricao = document.getElementById('descricao');
  const inputData = document.getElementById('data-escrita');
  const inputHora = document.getElementById('hora-escrita');
  const nomeCounter = document.getElementById('nome-counter');
  const descricaoCounter = document.getElementById('descricao-counter');
  const nextQuantBadge = document.getElementById('next-quant-badge');
  const proximoId = nextQuantBadge.dataset.proximoId;

  const btnInserir = document.getElementById('btn-inserir');
  const btnSalvarAlteracao = document.getElementById('btn-salvar-alteracao');
  const btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');

  const buscaInput = document.getElementById('busca-input');
  const btnLimparPesquisa = document.getElementById('btn-limpar-pesquisa');
  const totalRegistros = document.getElementById('total-registros');

  const deleteModal = document.getElementById('delete-modal');
  const deleteModalMsg = document.getElementById('delete-modal-msg');
  const deleteForm = document.getElementById('delete-form');

  function preencherDataHoraAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    inputData.value = `${ano}-${mes}-${dia}`;
    inputHora.value = `${horas}:${minutos}:${segundos}`;
  }

  function atualizarContadorCampo(input, counterEl, limite) {
    const len = input.value.length;
    counterEl.textContent = `${len} / ${limite}`;
    counterEl.classList.remove('near-limit', 'at-limit');

    if (len >= limite) {
      counterEl.classList.add('at-limit');
    } else if (len >= limite * 0.85) {
      counterEl.classList.add('near-limit');
    }
  }

  function filtrarNaTela() {
    const q = (buscaInput.value || '').trim().toLowerCase();
    const idBuscado = q
      .replace(/^lembran[çc]a\s*#?/, '')
      .replace(/^#/, '')
      .trim();

    const cards = document.querySelectorAll('.memory-card');
    const linhas = document.querySelectorAll('#tabela-lembrancas-body tr[data-id]');

    if (cards.length === 0) return;

    let visiveis = 0;
    cards.forEach((card) => {
      const id = card.dataset.id;
      const nome = card.dataset.nome || '';
      const desc = card.dataset.descricao || '';

      const bate =
        !q ||
        (idBuscado !== '' && id === idBuscado) ||
        nome.includes(q) ||
        desc.includes(q);

      card.style.display = bate ? '' : 'none';
      if (bate) visiveis++;
    });

    linhas.forEach((tr) => {
      const id = tr.dataset.id;
      const nome = tr.dataset.nome || '';
      const desc = tr.dataset.descricao || '';

      const bate =
        !q ||
        (idBuscado !== '' && id === idBuscado) ||
        nome.includes(q) ||
        desc.includes(q);

      tr.style.display = bate ? '' : 'none';
    });

    if (totalRegistros) {
      totalRegistros.textContent = `${visiveis} ${visiveis === 1 ? 'registro' : 'registros'}`;
    }
    if (btnLimparPesquisa) {
      btnLimparPesquisa.hidden = q.length === 0;
    }
  }

  function iniciarEdicao(btn) {
    const { id, nome, descricao, data, hora } = btn.dataset;

    form.action = `/itens/${id}/editar`;
    inputNome.value = nome;
    inputDescricao.value = descricao;
    inputData.value = data;
    inputHora.value = hora;

    formCard.classList.add('is-editing');
    nextQuantBadge.textContent = `Editando Lembrança #${id}`;
    formTitle.textContent = `Alterar Lembrança #${id}`;
    btnInserir.hidden = true;
    btnSalvarAlteracao.hidden = false;
    btnCancelarEdicao.hidden = false;

    document.querySelectorAll('.memory-card').forEach((c) => {
      c.classList.toggle('editing-highlight', c.dataset.id === id);
    });

    atualizarContadorCampo(inputNome, nomeCounter, 80);
    atualizarContadorCampo(inputDescricao, descricaoCounter, 500);

    formCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    inputNome.focus();
  }

  function cancelarEdicao() {
    form.action = '/itens';
    inputNome.value = '';
    inputDescricao.value = '';
    preencherDataHoraAtual();

    formCard.classList.remove('is-editing');
    nextQuantBadge.textContent = `Lembrança #${proximoId}`;
    formTitle.textContent = 'Inserir Lembrança';
    btnInserir.hidden = false;
    btnSalvarAlteracao.hidden = true;
    btnCancelarEdicao.hidden = true;

    document.querySelectorAll('.memory-card').forEach((c) => c.classList.remove('editing-highlight'));

    atualizarContadorCampo(inputNome, nomeCounter, 80);
    atualizarContadorCampo(inputDescricao, descricaoCounter, 500);
  }

  function abrirModalExclusao(btn) {
    const { id, nome } = btn.dataset;
    deleteForm.action = `/itens/${id}/excluir`;
    deleteModalMsg.textContent = `Deseja remover permanentemente "${nome}" (Lembrança #${id})?`;
    deleteModal.hidden = false;
  }

  function fecharModalExclusao() {
    deleteModal.hidden = true;
  }

  preencherDataHoraAtual();
  atualizarContadorCampo(inputNome, nomeCounter, 80);
  atualizarContadorCampo(inputDescricao, descricaoCounter, 500);

  inputNome.addEventListener('input', () => atualizarContadorCampo(inputNome, nomeCounter, 80));
  inputDescricao.addEventListener('input', () => atualizarContadorCampo(inputDescricao, descricaoCounter, 500));
  document.getElementById('btn-agora').addEventListener('click', preencherDataHoraAtual);
  btnCancelarEdicao.addEventListener('click', cancelarEdicao);

  if (buscaInput) {
    buscaInput.addEventListener('input', filtrarNaTela);
  }

  document.querySelectorAll('.btn-alterar').forEach((btn) => {
    btn.addEventListener('click', () => iniciarEdicao(btn));
  });

  document.querySelectorAll('.btn-excluir').forEach((btn) => {
    btn.addEventListener('click', () => abrirModalExclusao(btn));
  });

  document.getElementById('btn-cancelar-delete').addEventListener('click', fecharModalExclusao);
  document.getElementById('btn-fechar-delete').addEventListener('click', fecharModalExclusao);
  deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) fecharModalExclusao();
  });
})();
