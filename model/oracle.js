
const oracledb = require('oracledb');

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: 'c##useradmin',
      password: '123',
      connectString: 'localhost/orcl'
    });
    return connection;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const connection = await getConnection();
  console.log('Connection was successful!');
 
  const result = await connection.execute(`SELECT * FROM useradmin`)
  console.log(result.rows)
}
main();
