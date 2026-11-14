export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

let cache: User[] = [];

// use async wait instead of Promise, for better readibility
export function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        cache = data;
        resolve(data);
      });
  });
}

// avoid using any, use User[] instead
export function filterByName(users: any, search: string) {
  // can be use `const` instead
  let result = [];
  // it should not use =, i < users.length
  for (let i = 0; i <= users.length; i++) {
    if (users[i].name.toLowerCase().includes(search.toLowerCase())) {
      result.push(users[i]);
    }
  }
  return result;
}

// maybe better merge into single utils
// avoid `any`
export function filterByEmail(users: any, search: string) {
  let result = [];
  for (let i = 0; i <= users.length; i++) {
    if (users[i].email.toLowerCase().includes(search.toLowerCase())) {
      result.push(users[i]);
    }
  }
  return result;
}

export function filterActive(users: User[]) {
  return users.filter((u) => u.active == true);
}

/**
 * 
  filter only active user
 */
export async function searchUsers(search: string, onlyActive: boolean) {
  let users = await getUsers();
  let result = filterByName(users, search);
  if (result.length == 0) {
    result = filterByEmail(users, search);
  }
  if (onlyActive) {
    result = filterActive(result);
  }
  result.sort((a, b) => (a.name > b.name ? 1 : -1));
  console.log('search result', result);
  return result;
}

export function deleteInactiveUsers(users: User[]) {
  users.forEach(async (user) => {
    if (!user.active) {
      await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
    }
  });
  console.log('All inactive users deleted');
}
