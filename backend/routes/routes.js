// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Invalid GET!'
        });
    });

    // Display all users
    app.get('/api/campanas', (request, response) => {
        pool.query('SELECT * FROM campanas', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/api/campana/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM campanas WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/api/tickets', (req, response) => {
        pool.query('INSERT INTO tickets SET (Descripcion,'
            +'Estatus,Responsable,Supervisado,Creado_Por,Fecha_Inicio,'
            +'Fecha_Fin,Fecha_Seguimiento,Hora_Abierto)'
            +'VALUES OF (?,?,?,?,?,?,?,?,?)', 
            [req.body.Descripcion,req.body.Estatus,req.body.Responsable,req.body.Supervisado,req.body.Creado_Por,req.body.Fecha_Inicio,
            req.body.Fecha_Fin,req.body.Fecha_Seguimiento,req.body.Hora_Abierto], 
            (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.id}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });

    // app.use(function(req, res) {
    //     res.redirect('/')
    // });
}

// Export the router
module.exports = router;