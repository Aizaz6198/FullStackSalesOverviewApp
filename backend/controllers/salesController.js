const { getOrderCollection } = require("../models/orderModel");

async function getAllIntervalsSales(req, res) {
  try {
    const orderCollection = await getOrderCollection();

    const sales = await orderCollection
      .aggregate([
        {
          $addFields: {
            created_at_date: { $dateFromString: { dateString: "$created_at" } },
          },
        },
        {
          $facet: {
            daily: [
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$created_at_date",
                    },
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
            ],
            monthly: [
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m",
                      date: "$created_at_date",
                    },
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
            ],
            quarterly: [
              {
                $group: {
                  _id: {
                    $concat: [
                      { $toString: { $year: "$created_at_date" } },
                      "-Q",
                      {
                        $toString: {
                          $ceil: {
                            $divide: [{ $month: "$created_at_date" }, 3],
                          },
                        },
                      },
                    ],
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
            ],
            yearly: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y", date: "$created_at_date" },
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ])
      .toArray();

    res.json(sales[0]); // Return the first element in the result array
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
}

async function getSalesGrowth(req, res) {
  try {
    const orderCollection = await getOrderCollection();

    const salesGrowthData = await orderCollection
      .aggregate([
        {
          $addFields: {
            created_at_date: { $dateFromString: { dateString: "$created_at" } },
          },
        },
        {
          $facet: {
            daily: [
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$created_at_date",
                    },
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
              {
                $setWindowFields: {
                  sortBy: { _id: 1 },
                  output: {
                    previousSales: {
                      $shift: {
                        output: "$totalSales",
                        by: -1,
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  totalSales: 1,
                  growthRate: {
                    $cond: {
                      if: { $eq: ["$previousSales", 0] },
                      then: null,
                      else: {
                        $multiply: [
                          {
                            $divide: [
                              { $subtract: ["$totalSales", "$previousSales"] },
                              "$previousSales",
                            ],
                          },
                          100,
                        ],
                      },
                    },
                  },
                },
              },
            ],
            monthly: [
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m",
                      date: "$created_at_date",
                    },
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
              {
                $setWindowFields: {
                  sortBy: { _id: 1 },
                  output: {
                    previousSales: {
                      $shift: {
                        output: "$totalSales",
                        by: -1,
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  totalSales: 1,
                  growthRate: {
                    $cond: {
                      if: { $eq: ["$previousSales", 0] },
                      then: null,
                      else: {
                        $multiply: [
                          {
                            $divide: [
                              { $subtract: ["$totalSales", "$previousSales"] },
                              "$previousSales",
                            ],
                          },
                          100,
                        ],
                      },
                    },
                  },
                },
              },
            ],
            quarterly: [
              {
                $group: {
                  _id: {
                    $concat: [
                      { $toString: { $year: "$created_at_date" } },
                      "-Q",
                      {
                        $toString: {
                          $ceil: {
                            $divide: [{ $month: "$created_at_date" }, 3],
                          },
                        },
                      },
                    ],
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
              {
                $setWindowFields: {
                  sortBy: { _id: 1 },
                  output: {
                    previousSales: {
                      $shift: {
                        output: "$totalSales",
                        by: -1,
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  totalSales: 1,
                  growthRate: {
                    $cond: {
                      if: { $eq: ["$previousSales", 0] },
                      then: null,
                      else: {
                        $multiply: [
                          {
                            $divide: [
                              { $subtract: ["$totalSales", "$previousSales"] },
                              "$previousSales",
                            ],
                          },
                          100,
                        ],
                      },
                    },
                  },
                },
              },
            ],
            yearly: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y", date: "$created_at_date" },
                  },
                  totalSales: {
                    $sum: { $toDouble: "$total_price_set.shop_money.amount" },
                  },
                },
              },
              { $sort: { _id: 1 } },
              {
                $setWindowFields: {
                  sortBy: { _id: 1 },
                  output: {
                    previousSales: {
                      $shift: {
                        output: "$totalSales",
                        by: -1,
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  totalSales: 1,
                  growthRate: {
                    $cond: {
                      if: { $eq: ["$previousSales", 0] },
                      then: null,
                      else: {
                        $multiply: [
                          {
                            $divide: [
                              { $subtract: ["$totalSales", "$previousSales"] },
                              "$previousSales",
                            ],
                          },
                          100,
                        ],
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      ])
      .toArray();

    res.json(salesGrowthData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales growth data" });
  }
}

module.exports = { getAllIntervalsSales, getSalesGrowth };
