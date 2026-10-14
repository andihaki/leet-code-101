# mikir

kalo kayak struktur folder. maka 1 push === 1 pop

```javascript
const result = [];
function dfs(i, path, prefix) {
  console.log(prefix + `dfs(i=${i}) path=[${path}]  → RECORD [${[...path]}]`);
  result.push([...path]);
  const js = [];
  for (let j = i; j < nums.length; j++) js.push(j);
  js.forEach((j, idx) => {
    const last = idx === js.length - 1;
    const branch = prefix + (last ? "└─ " : "├─ ");
    const childPrefix = prefix + (last ? "   " : "│  ");
    path.push(nums[j]);
    console.log(branch + `PUSH ${nums[j]}  path=[${path}]`);
    dfs(j + 1, path, childPrefix);
    console.log(branch + `POP ${path.pop()}  path=[${path}]`);
  });
}
dfs(0, [], "");
```
