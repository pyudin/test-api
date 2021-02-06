const express = require("express");
const router = express.Router();

const usersMock = require("./MOCK/mock-users");
const statsMock = require("./MOCK/mock-users-statistic");

function filteredStats(stats, userId) {
  const fs = stats.filter((stat) => stat.user_id == userId);
  return fs.map(({ date, page_views, clicks }) => ({
    date,
    page_views,
    clicks,
  }));
}

// Users list
router.get("/", (req, res) => {
  const page = Number(req.query["page"]) || 1;
  const limit = Number(req.query["limit"]) || 50;
  let results;
  if (page > 1) {
    const offset = (page - 1) * limit;
    results = usersMock.slice(offset).slice(0, limit);
  } else results = usersMock.slice(0, limit);

  const fullResults = results.map((user) => {
    const stats = filteredStats(statsMock, user.id);
    user.total_page_views = stats.reduce((acc, el) => acc + el.page_views, 0);
    user.total_clicks = stats.reduce((acc, el) => acc + el.clicks, 0);
    return user;
  });
  res.send(fullResults);
});

// User stats
router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  const stats = filteredStats(statsMock, user_id);
  // const data_page_views = stats.map((el) => el.page_views);
  // const data_clicks = stats.map((el) => el.clicks);
  // const data_date = stats.map((el) => el.date);
  const data_page_views = [];
  const data_clicks = [];
  const data_date = [];

  stats.forEach((el) => {
    data_page_views.push(el.page_views);
    data_clicks.push(el.clicks);
    data_date.push(el.date);
  });

  const user = usersMock.find((user) => user.id == user_id);
  const results = {
    ...user,
    data_page_views,
    data_clicks,
    data_date,
  };

  res.send(results);
});

module.exports = router;
