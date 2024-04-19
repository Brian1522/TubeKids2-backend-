const { Schema, model } = require("mongoose");

const AccountsPlaylistSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account is required"],
    },
    playlist: {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
        required: [true, "User is required"],
    },
    status: {
        type: Boolean,
        default: true,
    },
})
AccountsPlaylistSchema.methods.toJSON = function () {
    const {_id, ...accountsPlaylist } = this.toObject(); // cambia el nombre del id para los nuevos id
    accountsPlaylist.uid = _id;
    return accountsPlaylist;
}

module.exports = model("AccountsPlaylist", AccountsPlaylistSchema);