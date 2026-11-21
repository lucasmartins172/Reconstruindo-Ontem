const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET / e GET /itens: busca todos os registros no MySQL e envia para a página
router.get(['/', '/itens'], async (req, res) => {
  try {
    const busca = (req.query.q || '').trim();
    let sql = 'SELECT id, Nome, Descricao, Data_Escrita, Hora_Escrita FROM SuaLembranca';
    const params = [];

    if (busca) {
      const idLimpo = busca
        .toLowerCase()
        .replace(/^lembran[çc]a\s*#?/, '')
        .replace(/^#/, '')
        .trim();

      if (/^\d+$/.test(idLimpo)) {
        sql += ' WHERE id = ? OR Nome LIKE ? OR Descricao LIKE ?';
        params.push(Number(idLimpo), `%${busca}%`, `%${busca}%`);
      } else {
        sql += ' WHERE Nome LIKE ? OR Descricao LIKE ?';
        params.push(`%${busca}%`, `%${busca}%`);
      }
    }

    sql += ' ORDER BY id DESC';

    const [lembrancas] = await db.query(sql, params);
    const [[{ maxId }]] = await db.query('SELECT COALESCE(MAX(id), 0) AS maxId FROM SuaLembranca');

    res.render('index', {
      lembrancas,
      proximoId: maxId + 1,
      termoBusca: busca,
      erro: null
    });
  } catch (err) {
    console.error('Erro ao consultar MySQL:', err);
    res.render('index', {
      lembrancas: [],
      proximoId: 1,
      termoBusca: '',
      erro: 'Erro ao conectar no MySQL. Verifique se você rodou o script.sql e se a senha no arquivo .env está certa.'
    });
  }
});

// POST /itens: recebe os dados do formulário, grava no MySQL e redireciona
router.post('/itens', async (req, res) => {
  try {
    const { Nome, Descricao, Data_Escrita, Hora_Escrita } = req.body;
    const horaFormatada = Hora_Escrita && Hora_Escrita.length === 5 ? `${Hora_Escrita}:00` : Hora_Escrita;

    await db.query(
      'INSERT INTO SuaLembranca (Nome, Descricao, Data_Escrita, Hora_Escrita) VALUES (?, ?, ?, ?)',
      [Nome.trim(), Descricao.trim(), Data_Escrita, horaFormatada]
    );

    res.redirect('/');
  } catch (err) {
    console.error('Erro ao inserir lembrança:', err);
    res.status(500).send('Erro ao gravar registro no MySQL.');
  }
});

// POST /itens/:id/editar: atualiza a lembrança no MySQL
router.post('/itens/:id/editar', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nome, Descricao, Data_Escrita, Hora_Escrita } = req.body;
    const horaFormatada = Hora_Escrita && Hora_Escrita.length === 5 ? `${Hora_Escrita}:00` : Hora_Escrita;

    await db.query(
      'UPDATE SuaLembranca SET Nome = ?, Descricao = ?, Data_Escrita = ?, Hora_Escrita = ? WHERE id = ?',
      [Nome.trim(), Descricao.trim(), Data_Escrita, horaFormatada, id]
    );

    res.redirect('/');
  } catch (err) {
    console.error('Erro ao editar lembrança:', err);
    res.status(500).send('Erro ao atualizar registro no MySQL.');
  }
});

// POST /itens/:id/excluir: exclui a lembrança no MySQL
router.post('/itens/:id/excluir', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM SuaLembranca WHERE id = ?', [id]);
    res.redirect('/');
  } catch (err) {
    console.error('Erro ao excluir lembrança:', err);
    res.status(500).send('Erro ao excluir registro no MySQL.');
  }
});

module.exports = router;
