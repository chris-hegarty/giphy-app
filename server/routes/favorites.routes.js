const express = require("express");
const router = express.Router();
const { add, remove, getByUser, getAll } = require("../models/favorites.model");
const auth = require("../middleware/auth.middleware");

router.put("/add", auth, async (req, res) => {
	const favorite = req.body;
	if (!favorite.gif_id || !favorite.title || !favorite.url) {
		return res.send({
			success: false,
			data: null,
			error: "Invalid data provided",
		});
	}
	console.log("Am i getting a favorite here line 15 route file?");
	console.log(favorite);
	console.log(req.user.id);
	const resObj = await add({ ...favorite, user_id: req.user.id });
	console.log(resObj);
	return res.send(resObj);
});

router.delete("/delete/:gif_id", auth, async (req, res) => {
	const gif_id = req.params.gif_id;
	const resObj = await remove(gif_id, req.user.id);

	return res.send(resObj);
});

router.get("/user", auth, async (req, res) => {
	const resObj = await getByUser(req.user.id);

	return res.send(resObj);
});

router.get("/all", async (req, res) => {
	const resObj = await getAll();

	return res.send(resObj);
});

module.exports = router;
