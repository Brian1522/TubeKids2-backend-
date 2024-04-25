const Playlist = require("../models/playlist")
const User = require("../models/user")

const playlistGet = async (req, res) => {
    const { userId } = req.params;
    const playlist = await Playlist.find({ user: userId }); // Busca todas las playlist para el usuario


    // Obtiene el nombre de usuario asociado al ID de usuario
    const user = await User.findById(userId);
    const user_name = user ? user.name : ''; // Si el usuario existe, obtiene su nombre, de lo contrario, establece una cadena vacía

    // Modifica cada objeto de playlist para incluir user_id y user_name, pero sin incluir el campo user
    const modifiedPlaylists = playlist.map(playlist => ({
        _id: playlist._id,
        name: playlist.name,
        videos: playlist.videos,
        __v: playlist.__v,
        user_id: playlist.user, // user_id es el mismo que el campo user en el documento
        user_name // El nombre de usuario obtenido anteriormente
    }));

    const totalplaylist = playlist.length; // Total de playlists

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
    const { videoId } = req.body; // Se espera que el cliente envíe el ID del video a eliminar

    try {
        // Buscar la playlist por su ID y eliminar el video del array de videos
        const playlist = await Playlist.findOneAndUpdate(
          { _id: id },
          { $pull: { videos: { _id: videoId } } }, // Utilizamos $pull para eliminar el video del array
          { new: true }
        );
    
        if (!playlist) {
          return res.status(404).json({ msg: "Playlist not found" });
        }
    
        res.json({
          msg: "Video deleted from playlist",
          playlist
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
      }
    };
    
//Actualiza playlist
const playlistPut = async (req, res) => {
    const { id } = req.params;
    const { videos, ...rest } = req.body; // Se extraen los videos y el resto de los datos
    try {
        // Primero, actualiza el resto de los datos de la lista de reproducción
        const playlist = await Playlist.findByIdAndUpdate(id, rest, { new: true });

        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist no encontrada' });
        }

        // Iterar sobre los videos recibidos
        if (videos && Array.isArray(videos)) {
            videos.forEach(async (video) => {
                // Verificar si el video ya existe en la lista de reproducción
                const existingVideo = playlist.videos.find(v => v._id.toString() === video._id);
                if (existingVideo) {
                    // Si el video ya existe, actualizar su información
                    Object.assign(existingVideo, video);
                } else {
                    // Si el video no existe, agregarlo a la lista de reproducción
                    playlist.videos.push(video);
                }
            });
        } else if (videos) {
            // Si solo se proporciona un video, se maneja por separado
            const existingVideo = playlist.videos.find(v => v._id.toString() === videos._id);
            if (existingVideo) {
                Object.assign(existingVideo, videos);
            } else {
                playlist.videos.push(videos);
            }
        }

        // Guarda los cambios
        await playlist.save();

        // Responde con la lista de reproducción actualizada
        res.status(200).json({
            msg: 'Nuevos videos agregados',
            playlist
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
module.exports = { playlistGet, playlistPost, playlistDelete, playlistPut };