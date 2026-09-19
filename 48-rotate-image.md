# soal

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

# contoh

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

# solusi yang salah

dari `Example 1` ada pola:
0,0 => 0,2
0,1 => 1,2
0,2 => 2,2

1,0 => 0,1
1,1 => 1,1
1,2 => 2,1

2,0 => 0,0
2,1 => 1,0
2,2 => 2,0

Jadi tinggal di swap aja value di setiap matrix, tapi:

```javascript
var rotate = function (matrix) {
  const len = matrix.length;
  for (let i = 0; i < len; i++) {
    const temp = [];
    for (let j = 0; j < len; j++) {
      console.log(
        i,
        j,
        `${i},${j}`,
        `${j},${len - i - 1}`,
        matrix[i][j],
        matrix[j][len - i - 1],
      );
      [matrix[i][j], matrix[j][len - i - 1]] = [
        matrix[j][len - i - 1],
        matrix[i][j],
      ];
    }
  }

  return matrix;
};
```

tapi ternyata ga sesuai harapan karna value nya bakal ke replace. dan outputnya ga sesuai
exptected : [[7,4,1],[8,5,2],[9,6,3]]
solusi output : [[7,4,9],[2,5,8],[1,6,3]]

# solusi yang betul

https://youtu.be/fMSJSS7eO1w?t=207
Jadi ada 4 pointer (left , right, top, bottom) dan karna 2 dimensi maka akan ada topxleft, topxright, bottomxright,bottomxleft.
dan perlu swap value berlawanan jarum jam dan 1 TEMPORARY VARIABLE buat nampung value awal.

```
1 2 3
4 5 6
7 8 9
```

left = 0, right = len
loop 1:
topxleft = 1, bottomxleft = 7, bottomxright = 9, topxright = 3

- simpan 1 ke temporary variable
- pindahin 7 ke 1
- 9 ke 7
- 3 ke 9
- temporary variable ke 1

buat lanjut ke loop berikut nya, berarti perlu geser topxleft + 1, bottomxleft-1, bottomxright-x, topxright-1
sama: left++, right--
