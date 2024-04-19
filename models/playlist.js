const { Schema, model } = require("mongoose");

const PlaylistSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    
    name: {
        type: String,
        required: [true, "name is required"],
    },
    url: {
        type: String,
        required: [true, "URl is required"],
    },
    status: {
        type: Boolean,
        default: true
    }

});
PlaylistSchema.methods.toJSON = function () {
    const { __v, _id, ...playlist } = this.toObject();
    playlist.uid = _id;
    return playlist;
}
module.exports = model("Playlist", PlaylistSchema);