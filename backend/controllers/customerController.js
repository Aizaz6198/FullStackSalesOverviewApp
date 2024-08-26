const { getCustomerCollection } = require("../models/customerModel");
const { getOrderCollection } = require("../models/orderModel");

async function getNewCustomers(req, res) {
  try {
    const customersCollection = await getCustomerCollection();

    // Daily Aggregation
    const dailyCustomers = await customersCollection
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $dateFromString: { dateString: "$created_at" } },
              },
            },
            newCustomers: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date ascending
      ])
      .toArray();

    // Monthly Aggregation
    const monthlyCustomers = await customersCollection
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: { $dateFromString: { dateString: "$created_at" } },
              },
            },
            newCustomers: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date ascending
      ])
      .toArray();

    // Yearly Aggregation
    const yearlyCustomers = await customersCollection
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y",
                date: { $dateFromString: { dateString: "$created_at" } },
              },
            },
            newCustomers: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date ascending
      ])
      .toArray();

    res.json({
      daily: dailyCustomers,
      monthly: monthlyCustomers,
      yearly: yearlyCustomers,
    });
  } catch (error) {
    console.error("Error during aggregation:", error); // Log error details
    res.status(500).json({
      error: "Failed to fetch new customers data",
      details: error.message,
    });
  }
}

async function getRepeatCustomers(req, res) {
  try {
    const ordersCollection = await getOrderCollection();

    // Daily Aggregation
    const dailyRepeatCustomers = await ordersCollection
      .aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: { dateString: "$created_at" },
            },
          },
        },
        {
          $group: {
            _id: {
              customer_id: "$customer_id",
              day: {
                $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" },
              },
            },
            purchaseCount: { $sum: 1 },
          },
        },
        {
          $match: { purchaseCount: { $gt: 1 } },
        },
        { $sort: { "_id.day": 1 } },
      ])
      .toArray();

    // Monthly Aggregation
    const monthlyRepeatCustomers = await ordersCollection
      .aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: { dateString: "$created_at" },
            },
          },
        },
        {
          $group: {
            _id: {
              customer_id: "$customer_id",
              month: {
                $dateToString: { format: "%Y-%m", date: "$created_at_date" },
              },
            },
            purchaseCount: { $sum: 1 },
          },
        },
        {
          $match: { purchaseCount: { $gt: 1 } },
        },
        { $sort: { "_id.month": 1 } },
      ])
      .toArray();

    // Quarterly Aggregation
    const quarterlyRepeatCustomers = await ordersCollection
      .aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: { dateString: "$created_at" },
            },
          },
        },
        {
          $group: {
            _id: {
              customer_id: "$customer_id",
              quarter: {
                $concat: [
                  { $toString: { $year: "$created_at_date" } },
                  "-Q",
                  {
                    $toString: {
                      $ceil: { $divide: [{ $month: "$created_at_date" }, 3] },
                    },
                  },
                ],
              },
            },
            purchaseCount: { $sum: 1 },
          },
        },
        {
          $match: { purchaseCount: { $gt: 1 } },
        },
        { $sort: { "_id.quarter": 1 } },
      ])
      .toArray();

    // Yearly Aggregation
    const yearlyRepeatCustomers = await ordersCollection
      .aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: { dateString: "$created_at" },
            },
          },
        },
        {
          $group: {
            _id: {
              customer_id: "$customer_id",
              year: {
                $dateToString: { format: "%Y", date: "$created_at_date" },
              },
            },
            purchaseCount: { $sum: 1 },
          },
        },
        {
          $match: { purchaseCount: { $gt: 1 } },
        },
        { $sort: { "_id.year": 1 } },
      ])
      .toArray();

    // Send response with all intervals
    res.json({
      daily: dailyRepeatCustomers,
      monthly: monthlyRepeatCustomers,
      quarterly: quarterlyRepeatCustomers,
      yearly: yearlyRepeatCustomers,
    });
  } catch (error) {
    console.error("Error fetching repeat customers data:", error);
    res.status(500).json({ error: "Failed to fetch repeat customers data" });
  }
}

async function getCustomerDistribution(req, res) {
  try {
    const customersCollection = await getCustomerCollection(); // Correctly call the function

    const distribution = await customersCollection
      .aggregate([
        {
          $group: { _id: "$default_address.city", customerCount: { $sum: 1 } },
        },
        { $sort: { customerCount: -1 } }, // Sort by the number of customers in descending order
      ])
      .toArray(); // Use toArray to execute the aggregation

    res.json(distribution); // Send the result as JSON
  } catch (error) {
    console.error("Error fetching customer distribution data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch customer distribution data" });
  }
}

async function getCustomerLifetimeValue(req, res) {
  try {
    const ordersCollection = await getOrderCollection();

    const lifetimeValueByCohort = await ordersCollection
      .aggregate([
        {
          $group: {
            _id: "$customer_id",
            firstPurchase: { $min: "$created_at" }, // Get the earliest order date for each customer
            totalSpent: { $sum: "$total_price_set.shop_money.amount" }, // Sum of all orders for this customer
          },
        },
        {
          $project: {
            _id: 1,
            firstPurchaseMonth: {
              $dateToString: {
                format: "%Y-%m",
                date: { $dateFromString: { dateString: "$firstPurchase" } },
              },
            },
            totalSpent: 1,
          },
        },
        {
          $group: {
            _id: "$firstPurchaseMonth", // Group by cohort (first purchase month)
            lifetimeValue: { $sum: "$totalSpent" }, // Sum of total spent by all customers in this cohort
            customerCount: { $sum: 1 }, // Count the number of customers in this cohort
          },
        },
        { $sort: { _id: 1 } }, // Sort by cohort (month) in ascending order
      ])
      .toArray();

    res.json(lifetimeValueByCohort);
  } catch (error) {
    console.error("Error fetching customer lifetime value:", error.message);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getNewCustomers,
  getRepeatCustomers,
  getCustomerDistribution,
  getCustomerLifetimeValue,
};
