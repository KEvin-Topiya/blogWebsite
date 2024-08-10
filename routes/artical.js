const express = require("express");
const Artical = require("./../models/artical");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articals/new", { artical: new Artical() });
});

router.get("/edit/:id", async (req, res) => {
  const artical = await Artical.findById(req.params.id);
  res.render("articals/edit", { artical: artical });
});

router.get("/:slug", async (req, res) => {
  const artical = await Artical.findOne({ slug: req.params.slug });
  if (artical == null) res.redirect("/");
  res.render("articals/show", { artical: artical });
});

router.delete("/:id", async (req, res) => {
  await Artical.findByIdAndDelete(req.params.id);

  res.redirect("/");
});

router.post(
  "/",
  async (req, res,next) => {
    req.artical = new Artical();
    next();
  },
  saveArtical("new")
);

router.put(
  "/:id",
  async (req, res,next) => {
    req.artical = await Artical.findById(req.params.id);
    next()
  },
  saveArtical("edit")
);

function saveArtical(path) {
  return async (req, res) => {
    let artical = req.artical;
    artical.title = req.body.title;
    artical.dec = req.body.dec;
    artical.markdown = req.body.markdown;

    try {
      artical = await artical.save();
      res.redirect(`/articals/${artical.slug}`);
    } catch (e) {
      res.render(`articals/${path}`, { artical: artical });
    }
  };
}
module.exports = router;
