const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "project1"
};

async function addMsg(msg) {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `insert into MESSAGES_TABLE (MESSAGE) values (?)`;
  await connection.queryAsync(sql, [msg.MESSAGE]);
  await connection.endAsync();
}

async function showMsg() {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `select * from MESSAGES_TABLE`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();
  return list;
}

module.exports = { showMsg, addMsg };