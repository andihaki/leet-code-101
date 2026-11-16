const apiUsers = [
  {
    id: 1,
    name: "Amir",
    city: "Jakarta",
  },
  {
    id: 2,
    name: "Nadia",
    city: "Bandung",
  },
  {
    id: 3,
    name: "Budi",
    city: "Jakarta",
  },
];

const apiPosts = [
  {
    id: 10,
    userId: 1,
    title: "Hello",
  },
  {
    id: 11,
    userId: 2,
    title: "React tips",
  },
  {
    id: 12,
    userId: 1,
    title: "Node notes",
  },
  {
    id: 13,
    userId: 3,
    title: "AWS day",
  },
  {
    id: 14,
    userId: 1,
    title: "MongoDB",
  },
];

const fetch = function (path) {
  const data = path === "/users" ? apiUsers : apiPosts;

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
};

async function load() {
  // your code here
  const [uRes, pRes] = await Promise.all([fetch("/users"), fetch("/posts")]);
  if (!uRes.ok || !pRes.ok) throw new Error("Oops");
  const [users, posts] = await Promise.all([uRes.json(), pRes.json()]);
  const byUserId = posts.reduce((acc, curr) => {
    if (!(curr.userId in acc)) acc[curr.userId] = [];
    acc[curr.userId].push(curr.title);
    return acc;
  }, {});
  return users.map(({ id, ...user }) => ({
    ...user,
    postTitles: byUserId[id],
  }));
}

load()
  .then((r) => console.log(r))
  .catch((e) => console.log("Error:", e.message));
