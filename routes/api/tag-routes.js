const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get and Post request
router.route('/')
  .get(async (req, res) => {
    try {
      const tags = await Tag.findAll({
        include: [
          {
            model: Product,
            through: ProductTag,
          },
        ],
      });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const tag = await Tag.create(req.body);
      res.status(200).json(tag);
    } catch (err) {
      res.status(404).json(err);
    }
  });

// Get, put, and delete request based on ID
router.route('/:id')
  .get(async (req, res) => {
    try {
      const tag = await Tag.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Product,
            through: ProductTag,
          },
        ],
      });
      res.status(200).json(tag);
    } catch (err) {
      res.status(404).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const tag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(tag);
    } catch (err) {
      res.status(404).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const tag = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(tag);
    } catch (err) {
      res.status(404).json(err);
    }
  });

module.exports = router;