import {OpenDataBase} from './database.js';

export function incluir(imovel) {
  return new Promise((resolve, reject) => {
    console.log('cheguei aqui no service, indo executar o sql');
    try {
      const sql = `
      insert into Imovel(
        descricaoImovel, 
        email, 
        logradouroImovel, 
        numero, 
        complemento, 
        cep, 
        bairro, 
        cidade, 
        uf, 
        idUsuario, 
        situacaoImovel
        )
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const db = OpenDataBase();

      console.log('DUELO');
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            imovel.descricaoImovel,
            imovel.email,
            imovel.logradouro,
            imovel.numero,
            imovel.complemento,
            imovel.cep,
            imovel.bairro,
            imovel.cidade,
            imovel.uf,
            imovel.idUsuario,
            'a',
          ],
          (tx, results) => {
            imovel.idImovel = results.insertId;
            console.log(imovel);
            console.log('deu certo a inserção');
            resolve(imovel);
          },
        );
      });
    } catch (err) {
      console.log(err);
      console.log('deu pau');
      reject(err.message);
    }
  });
}

export function buscarTodos() {
  return new Promise((resolve, reject) => {
    try {
      const sql = 'select * from Imovel';

      const db = OpenDataBase();

      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Não foram encontrados imóveis.');
          }

          var imoveis = results.rows;
          console.log(imoveis);
          resolve(imoveis);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}