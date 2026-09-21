# soal

Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

# contoh

Example 1:

Input: grid = [
["1","1","1","1","0"],
["1","1","0","1","0"],
["1","1","0","0","0"],
["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]
]
Output: 3

# mikir (gagal)

nested loop buat ngecek apakah atas kanan kiri dan bawah === 0. kalo iya maka islands+1

```javascript
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    const up = i > 0 ? grid[i - 1][j] === "1" : true;
    const left = j > 0 ? grid[i][j - 1] === "1" : true;
    const right = j < col - 1 ? grid[i][j + 1] === "1" : false;
    const bottom = i < row - 1 ? grid[i + 1][j] === "1" : true;
    if (!up && !left && !right && !bottom) islands++;
  }
}
```

tapi ternyata ga works kalo Input nya = [["1"]] atau [["1"], ["0"]]

# solusi

pake BFS atau DFS.

```javascript
const row = grid.length,
  col = grid[0].length;
let islands = 0;

function dfs(i, j) {
  if (i < 0 || i >= row || j < 0 || j >= col || grid[i][j] !== "1") return;

  grid[i][j] = "0";

  dfs(i + 1, j);
  dfs(i - 1, j);
  dfs(i, j + 1);
  dfs(i, j - 1);
}

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (grid[i][j] === "1") {
      islands++;
      dfs(i, j);
    }
  }
}

return islands;
```

```javascript
var numIslands = function (grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;

        // Start BFS from this land cell
        const queue = [[r, c]];
        let head = 0;

        // Mark as visited by turning it into water
        grid[r][c] = "0";

        while (head < queue.length) {
          const [cr, cc] = queue[head++];

          for (const [dr, dc] of directions) {
            const nr = cr + dr;
            const nc = cc + dc;

            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              grid[nr][nc] === "1"
            ) {
              grid[nr][nc] = "0"; // mark visited
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }

  return islands;
};
```
