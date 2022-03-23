// sql 增、删、改、查 对于数据库操作

// 增
// INSERT INTO 表名(字段一,字段二, .....) VALUES(值一, 值二,....);

// 删（键删除： 通过更新状态代替删除）
// DELETE FROM 表名 条件语句;
// DELETE FROM users WHERE id=2;

// 改
// UPDATE 表名 SET 字段='值' 条件语句;
// UPDATE users SET username="张三" WHERE id=3;



// 查
// SELECT 字段一, 字段二, ... FROM 表名 条件语句
// SELECT*FROM 表名 条件语句;
// SELECT*FROM users;
// SELECT username,age FROM users WHERE age=(>, < 等)24
// OR, AND
// SELECT*FROM users WHERE age=20 ADN nsername='李四'

// 排列：正序ASC，倒序DESC
// SELECT*FROM users ORDER BY age ASC  

// 分页相关： LIMIT 限制查询  perPage=5,p=1
// SELECT*FROM users LIMIT 0,5;

// 组合
// SELECT*FROM users WHERE id>1 ORDER BY LIMIT 0,5

// 模糊查询 查询姓李的
// SELECT*FROM users WHERE username LIKE '李%'
// SELECT*FROM users WHERE username LIKE '%四'

// AS, JOIN ON 联表查询
// SELECT*FROM products LEFT JOIN users ON products.uid=users.id;
// LEFT JOIN：以 products 为主表
// RIGHT JOIN：以 users 为主表
// 别名
// SELECT*FROM products AS p LEFT JOIN users ON p.uid=users.id;

