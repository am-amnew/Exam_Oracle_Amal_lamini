
async function connect() {
    try {
      const connection = await oracledb.getConnection({
        user: 'c##useradmin',
        password: '123',
        connectString: 'localhost/orcl'
      });
      console.log('Connected to OracleDB');
      return connection;
    } catch (err) {
      console.error(err);
    }
  }


async function login(username, password) {
    try {
      const connection = await connect();
      const result = await connection.execute(
        `select *from useradmin WHERE username = :username AND password = :password`,
                        [username, password],
        { outFormat: oracledb.OBJECT }
      );
      await connection.close();
      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }