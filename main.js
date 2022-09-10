/* *
 *  1.- Importar Express y sus funciones.
 *  2.- Hacer instancia de la aplicación.
 *  3.- Middlewares
 *  4.- Declarar las rutas
 *  5.- Levantar Servidor
*/

const mascotas = [
    {
        tipo: "Perro",
        edad: "5 años",
        color: "Negro",
        peso: "4 Kg",
        nombre: "Papu"
    },
    {
        tipo: "Gatos",
        edad: "8 años",
        color: "Negro",
        peso: "2 Kg",
        nombre: "Michi"
    }
]

const peliculas = [
    {
        nombre: "Rapido y Furioso",
        año:    "2002",
        genero: "Acción",
        precio: 20
    },
    {
        nombre: "Señor de los Anillos",
        año:    "2008",
        genero: "Fantasia",
        precio: 40
    },
    {
        nombre: "Avengers",
        año:    "2015",
        genero: "Comics",
        precio: 40
    },
    {
        nombre: "El Niño de la Pijama de Rayas",
        año:    "2005",
        genero: "Drama",
        precio: 40
    }

]

//! 1.- Importar todas nuestras bibliotecas (Express y dotEnv).
require("dotenv").config();
const express = require('express');

//! 2.- Hacer instancia de la aplicación de Express y <>.
const app = express();

//! 3.- Middlewares.
app.use(express.json());

//! 4.- Declaramos las rutas.
app.get("/", (req, res) => {
    res.json({mensaje: 'Hola'})
})

//* Create - Post
app.post("/mascota", (req, res) => {
    const { tipo, edad , color, peso, nombre } = req.body;
    mascotas.push({tipo, edad, color, peso, nombre});
    // mascotas.push(req.body);
    res.json({ mensaje: "Mascota Registrada", data: mascotas });
    //* 3 formas de insertar datos
    //* req.body = Mandamos el objeto.
    //* req.params = Mandamos el objeto mediante la URL.
    //* req.query = Igual se manda mediante la URL pero con el simbolo "?" (No se especifica que se va a enviar).
});

//* Read - Get
app.get("/mascota", (req, res) => {
    console.log("GET:", req.body);
    res.json({ mascotas })
})

//* Update - Put
app.put("/mascota/:nombre", (req, res) => {
    const indice = mascotas.findIndex(
        (mascota) => mascota.nombre === req.params.nombre
    );

    if (indice === -1) {
        res.json({ error: "No se encontró a la mascota" });
        return;
    }
    const {
        tipo = mascotas[indice].tipo,
        edad = mascotas[indice].edad,
        color = mascotas[indice].color,
        peso = mascotas[indice].peso,
        nombre = mascotas[indice].nombre,
    } = req.body;

    mascotas[indice] = {
        tipo,
        edad,
        color,
        peso,
        nombre,
    };

    res.json({ mascotaEditada: mascotas[indice], todasMascotas: mascotas });
});


//* Delete - Delete
app.delete("/mascota/:indice", function (req, res) {
    const [eliminado] = mascotas.splice(+req.params.indice, 1);
    if (!eliminado) {
        res.json({ error: "No existe este elemento" });
        return;
    }
    res.json({
        eliminado,
        mascotas,
    });
});

app.post("/pelicula", (req, res) => {
    const {nombre, año, genero, precio} = req.body;
    peliculas.push({nombre, año, genero, precio});
    res.json({ mensaje: "Pelicula Agregada", data: peliculas});
})

app.get("/pelicula", (req, res) => {
    res.json({ peliculas })
})

app.put("/pelicula/:indice", (req, res) => {
    const {
        nombre = peliculas[req.params.indice].nombre,
        año = peliculas[req.params.indice].año,
        genero = peliculas[req.params.indice].genero,
        precio = peliculas[req.params.indice].precio 
    } = req.body;
    peliculas[req.params.indice] = {nombre, año, genero, precio};
    res.json({ mensaje: "Se edito el elemento: ", data: peliculas[req.params.indice]})
})

//! 5.- Levantar el servidor.
app.listen(process.env.PORT, () => {
    console.log(`
    Bienvenido ${process.env.NOMBRE}.
    La aplicación se esta ejecutando en el puerto: ${process.env.PORT}
    `);
});