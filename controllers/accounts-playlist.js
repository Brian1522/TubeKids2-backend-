const AccountsPlaylist= require("../models/accounts-playlist")

const accountsPlaylistGet = async (req, res) => {
    const accountsPlaylist = await AccountsPlaylist.find({ status: true }); // trae todas las playlist en true
    res.json({
        accountsPlaylist
    });
}

const accountsplaylistPost = async (req, res) => {
    const { accountId, idPlaylist, } = req.body;

    const accountsPlaylist = new Playlist({
        account: accountId, playlist: idPlaylist
    });

    await accountsPlaylist.save(); // se guarda
    res.status(201).json({
        msg: 'Account Playlist created',
        accountsPlaylist
    })
}


module.exports = { accountsPlaylistGet,accountsplaylistPost};