const orders = [
  { customer: "Amir", amount: 42.5 },
  { customer: "Nadia", amount: 18 },
  { customer: "Amir", amount: 10.25 },
  { customer: "Budi", amount: 99.99 },
  { customer: "Nadia", amount: 7.75 },
];

function transform(orders) {
  const result = {};
  for (const order of orders) {
    if (!(order.customer in result)) {
      result[order.customer] = {
        customer: order.customer,
        total: 0,
        orderCount: 0,
      };
    }
    result[order.customer].total += order.amount;
    result[order.customer].orderCount += 1;
  }
  return Object.values(result)
    .map((val) => ({ ...val, total: Math.round(val.total * 100) / 100 }))
    .sort((a, b) => b.total - a.total);
}

console.log(transform(orders));
