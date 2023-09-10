exports.isLang = (req, res, next) => {
  const { lang } = req.params;
  parseInt(lang)
    ? res.status(400).json("se debe pedir por lo menos algun idioma")
    : next();
};
