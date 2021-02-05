const express = require("express");
const router = express.Router();

const usersMock = require("./MOCK/mock-users");
const statsMock = require("./MOCK/mock-users-statistic");

// Users list
router.get("/", (req, res) => {
  const page = Number(req.query["page"]) || 1;
  const limit = Number(req.query["limit"]) || 50;
  let results;
  if (page > 1) {
    const offset = (page - 1) * limit;
    results = usersMock.slice(offset).slice(0, limit);
  } else results = usersMock.slice(0, limit);

  res.send(results);
});

// User stats
router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  const filteredStats = statsMock.filter((stat) => stat.user_id == user_id);

  // remove user_id
  const stats = filteredStats.map(({ date, page_views, clicks }) => ({
    date,
    page_views,
    clicks,
  }));

  const total_page_views = stats.reduce((acc, el) => acc + el.page_views, 0);
  const total_clicks = stats.reduce((acc, el) => acc + el.clicks, 0);

  const user = usersMock.find((user) => user.id == user_id);
  const results = { ...user, total_clicks, total_page_views, stats };

  res.send(results);
});

module.exports = router;
