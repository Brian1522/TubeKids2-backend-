const User = require("../models/user");
const Playlist = require("../models/playlist");
const Account = require("../models/accounts");
const Role = require("../models/role");

const isRegisteredEmail = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`Email ${email} is already registered`);
  }
};

//valida que no se repitan los nombres
const isRegisteredVideo = async (name = "") => {
  const nameExist = await Playlist.findOne({ name });

  if (nameExist) {
    throw new Error(`Name ${name} is already registered`);
  }
};

//valida que no se repitan los urls
const isRegisteredUrl = async (url = "") => {
  const urlExist = await Playlist.findOne({ url });

  if (urlExist) {
    throw new Error(`URL ${url} is already registered`);
  }
};

//valida nombre cuenta
const isRegisteredaccount = async (name = "") => {
  const nameExist = await Account.findOne({ name });

  if (nameExist) {
    throw new Error(`Name ${name} is already registered`);
  }
};
//valida que exista la cuenta
const isNotRegisteredaccount = async (id = "") => {
  const idExist = await Account.findById(id);

  if (!idExist) { // si no existe
    throw new Error(`id ${id} is not registered`);
  }
};
//valida idplaylist
const isRegisteredPlaylist = async (id = "") => {
  const idExist = await Playlist.findById(id);

  if (!idExist) {
    throw new Error(`Id ${id} is not registered`);
  }
};
const isNotRegisteredplaylist = async (id = "") => {
  const idExist = await Playlist.findById(id);
  
  if (!idExist) { // si no existe
    throw new Error(`id ${id} is not registered`);
  }
};

module.exports = {
  isRegisteredEmail, isRegisteredVideo, isRegisteredUrl, isRegisteredaccount, isRegisteredPlaylist,
  isNotRegisteredaccount, isNotRegisteredplaylist
}
