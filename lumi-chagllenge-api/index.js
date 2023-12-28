import app from './server.js'

app.set('port', process.env.PORT || 5000);
const port = app.get('port');

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});

