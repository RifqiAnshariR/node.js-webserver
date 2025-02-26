import http from 'http';

const requestListener = (request, response) => {
    const { method, url } = request;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Powered-By', 'Node.js');

    switch (url) {
        case "/":
            switch (method) {
                case "GET":
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: "Halo HTTP Server!" }));
                    break;
                case "POST":
                    let body = [];
                    request.on('data', (chunk) => body.push(chunk));
                    request.on('end', () => {
                        try {
                            body = Buffer.concat(body).toString();
                            const { name } = JSON.parse(body);
                            response.statusCode = 201;
                            response.end(JSON.stringify({ message: `Data berhasil dikirim! Hai, ${name}!` }));
                        } catch (err) {
                            response.statusCode = 400;
                            response.end(JSON.stringify({ message: "Invalid JSON format" }));
                        }
                    });
                    break;
                case "PUT":
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: "Data berhasil diperbarui!" }));
                    break;
                case "DELETE":
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: "Data berhasil dihapus!" }));
                    break;
                default:
                    response.statusCode = 405;
                    response.end(JSON.stringify({ message: "Method tidak diizinkan" }));
                    break;
            }
            break;

        case "/about":
            switch (method) {
                case "GET":
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: "Halo! Ini adalah halaman about" }));
                    break;
                case "POST":
                    let body = [];
                    request.on('data', (chunk) => body.push(chunk));
                    request.on('end', () => {
                        try {
                            body = Buffer.concat(body).toString();
                            const { name } = JSON.parse(body);
                            response.statusCode = 201;
                            response.end(JSON.stringify({ message: `Halo, ${name}! Ini adalah halaman about` }));
                        } catch (err) {
                            response.statusCode = 400;
                            response.end(JSON.stringify({ message: "Invalid JSON format" }));
                        }
                    });
                    break;
                default:
                    response.statusCode = 405;
                    response.end(JSON.stringify({ message: `Halaman tidak dapat diakses dengan ${method} request` }));
                    break;
            }
            break;

        default:
            response.statusCode = 404;
            response.end(JSON.stringify({ message: "Halaman tidak ditemukan!" }));
            break;
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});



// curl -X GET http://localhost:5000/          # "Ini adalah homepage"
// curl -X POST http://localhost:5000/         # "Halaman tidak dapat diakses dengan POST request"
// curl -X GET http://localhost:5000/about     # "Halo! Ini adalah halaman about"
// curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}"
// # "Halo, Dicoding! Ini adalah halaman about"
// curl -X DELETE http://localhost:5000/about  # "Halaman tidak dapat diakses dengan DELETE request"
// curl -X GET http://localhost:5000/random    # "Halaman tidak ditemukan!"
