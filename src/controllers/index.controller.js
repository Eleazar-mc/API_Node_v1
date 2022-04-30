//* Agregamos el modulo pg para conectanos a la DB 
const { Pool } = require('pg');

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    password: '',
    database: 'api_node_v1',
    port: '5432'

})

const getUsers = async (req, res) =>{
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
    console.log(response.rows);
    //res.send('Usuarios');
};

const createUser = async(req, res) =>{
    const {name, email} = req.body;
    const response =  await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    console.log(response),
    res.json({
        mensaje: 'Se ha creado un nuevo registro',
        body: {
            user: {name, email}
        }
    })
    //res.send('Se creó un nuevo registro');
    /* Imprime lo que llega del cuerpo 
    console.log(req.body);
    res.send('Usuario creado')
    */
};

const getUserById = async(req, res) =>{
    //res.send('Busqueda por id ' + req.params.id);
    //pool.query('SELECT * FROM user WHERE id = $1', [req.params.id]);
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    //res.status(200).json(response.rows);
    res.json(response.rows);
};

const deleteUser = async(req, res) => {
    //res.send('Usuario a eliminar con el id: ' + req.params.id);
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json(`Usuario ${id} eliminado`);
    console.log(response);
};

const updateUser = async(req, res) => {
    const id = req.params.id;
    const { name, email} = req.body;
    //console.log(id, name, email);
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name, 
        email, 
        id]);
    console.log(response);
    res.json('Datos de usuario actualizados correctamente');
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}