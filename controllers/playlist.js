const Playlist = require("../models/playlist")
const User = require("../models/user")

const playlistGet = async (req, res) => {
    const { userId } = req.params;
    const playlist = await Playlist.find({ user: userId }); // Busca todas las playlist para el usuario


    // Obtiene el nombre de usuario asociado al ID de usuario
    const user = await User.findById(userId);
    const user_name = user ? user.name : ''; // Si el usuario existe, obtiene su nombre, de lo contrario, establece una cadena vacía

    // Modifica cada objeto de playlist para incluir user_id y user_name, pero sin incluir el campo user
    const modifiedPlaylists = playlists.map(playlist => ({
        _id: playlist._id,
        name: playlist.name,
        videos: playlist.videos,
        __v: playlist.__v,
        user_id: playlist.user, // user_id es el mismo que el campo user en el documento
        user_name // El nombre de usuario obtenido anteriormente
    }));

    const totalplaylist = playlists.length; // Total de playlists

    res.json({
        playlist: modifiedPlaylists,
        totalplaylist
    });
}

const playlistPost = async (req, res) => {
    const { name, videos, userId } = req.body;

    const playlist = new Playlist({
        user: userId,
        name,
        videos // Videos es un array con los datos correctos no se corrige
    });

    try {
        await playlist.save(); // se guarda
        res.status(201).json({
            msg: 'Playlist created',
            playlist
        });
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({
            msg: 'Error al crear la lista'
        });
    }
}

const playlistDelete = async (req, res) => {
    const { id } = req.params;

    const playlist = await Playlist.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: 'Playlist deleted',
        playlist
    })
}
//Actualiza playlist
const playlistPut = async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body; // trae todo post

    const playlist = await Playlist.findByIdAndUpdate(id, rest);

    res.status(200).json({
        msg: 'Playlist edited',
        playlist
    })
}
module.exports = { playlistGet, playlistPost, playlistDelete, playlistPut };