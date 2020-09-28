#coding=gbk
#1. 输入1-127的ascii码并输出对应字符
'''
print('------------------Q1----------------')
l = []
for i in range(1,128):
    l.append(chr(i))
print(l)
'''
#2. 输入a，b，c，d4个整数，计算a+b-c*d的结果
'''
print('------------------Q2----------------')

num_a = int(input('输入整数:'))
num_b = int(input('输入整数:'))
num_c = int(input('输入整数:'))
num_d = int(input('输入整数:'))
print(num_a+num_b-num_c*num_d)
'''

#3. 计算一周有多少分钟、多少秒钟
#print('------------------Q3----------------')

#4. 3个人在餐厅吃饭，想分摊饭费。总共花费35.27美元，他们还想给15%的小费。每个人该怎么付钱，编程实现

#5. 计算一个12.5m X 16.7m的矩形房间的面积和周长

#6. 怎么得到9 / 2的小数结果
#print(9.0/2.0)

#7. python计算中7 * 7 *7 * 7，可以有多少种写法

#8. 写程序将温度从华氏温度转换为摄氏温度。转换公式为C = 5 / 9*(F - 32)
'''
num_8 = int(input('华氏温度:'))
c = 5 / 9*(num_8 -32)
print(c)
'''
#9. 一家商场在降价促销。如果购买金额50-100元（包含50元和100元）之间，会给10%的折扣，如果购买金额大于100元会给20%折扣。编写一程序，询问购买价格，再显示出折扣（10%或20%）和最终价格。
'''
num_9 = int(input('购买金额输入:'))
if 50 <= num_9 <=100:
    dis = num_9-(num_9 *0.1)
    print('购买金额给予10%折扣,最终价格为：',dis)
elif num_9 > 100:
    dis = num_9-(num_9 *0.2)
    print('购买金额给予20%折扣,最终价格为：',dis)
else:
    print('不满足降价促销')
'''
#10. 判断一个数n能否同时被3和5整除
'''
num_10 = int(input('数：'))
if num_10 % 3 ==0 and num_10 %5==0:
    print('输入数可以被整除')
else:
    print('输入数不可以被整除')
'''

#11. 1求1 + 2 + 3 +….+100
'''
num_11 = 0
for i in range(101):
    num_11 +=i
print(num_11)
'''

#12. 交换两个变量的值
'''
a = 1 
b = 2
a,b = b,a
print(a,b)
'''

#13. 一个足球队在寻找年龄在10到12岁的小女孩（包括10岁和12岁）加入。编写一个程序，询问用户的性别（m表示男性，f表示女性）和年龄，然后显示一条消息指出这个人是否可以加入球队，询问10次后，输出满足条件的总人数。
'''
num_13 = 0
for i in range(10):
    sex = input('请输入性别（m表示男性，f表示女性）：')
    age = int(input('请输入年龄：'))
    if sex=='f':
        if 10<= age <=12:
            num_13+=1
            print('这个人可以加入球队')
print('满足条件的人数共：',num_13)
'''

'''
14. 长途旅行中，刚到一个加油站，距下一个加油站还有200km，而且以后每个加油站之间距离都是200km。编写一个程序确定是不是需要在这里加油，还是可以等到接下来的第几个加油站再加油。
	程序询问以下几个问题：
	1）你车的油箱多大，单位升
	2）目前油箱还剩多少油，按百分比算，比如一半就是0.5
	3）你车每升油可以走多远（km）
	提示：
	    油箱中包含5升的缓冲油，以防油表不准。

space = 200
size = int(input('你车的油箱多大，单位升:'))-5
surplus = float(input('目前油箱还剩多少油，按百分比算，比如一半就是0.5:'))
far = int(input('你车每升油可以走多远（km）:'))
sum_14 = 0
if surplus*far 
'''
#15. 现有面包、热狗、番茄酱、芥末酱以及洋葱，数字显示有多少种订购组合，其中面包必订，0不订#，1订，比如10000，表示只订购面包
'''
print('-------------------Q15-----------------')
for i in range(2):
    for j in range(2):
        for a in range(2):
            for b in range(2):
                print(i,j,a,b)
'''
#16. 基于上题：给出每种食物的卡路里（自定义），再计算出每种组合总共的卡路里
'''
print('-------------------Q16-----------------')
bread = 1
Hot_dog = 2
ketchup =3 
Mustard =4

for i in range(2):
    res = 0
    if i ==1:
        res +=bread
    for j in range(2):
        if j == 1:
            res+=Hot_dog
        for k in range(2):
            if k == 1:
                res+=ketchup
            for m in range(2):
                if m == 1:
                    res+=Mustard
                    print(i,j,k,m,'总卡路里是：',res)
'''

#17. 输入5个名字，排序后输出
'''
l = []
for i in range(5):
    num_17=input('输入名字：')
    l.append(num_17)
l.sort()
print(l)
'''
'''
18.实现一个简单的单词本，功能如下：
	可以添加单词和词义，当所添加的单词已存在，让用户知道；
	可以查找单词，当查找的单词不存在时，让用户知道；
	可以删除单词，当删除的单词不存在时，让用户知道；
	以上功能可以无限制操作，直到用户输入bye退出程序。
'''
'''
d = {}
while True:
    
    add = input('是否要添加单词Y/N：')
    if add.lower() =='y':
        add_valuea = input('添加的单词：')
        if add_valuea in d:
            print('单词本里有这个词不用添加了')
        else:
            add_valueb = input('添加单词的语义：')
            d[add_valuea]=add_valueb
            print('添加成功')

    select = input('是否要查找单词Y/N：')
    if select.lower() =='y':
        select_value = input('输入查找的单词：')
        if select_value in d:
            print('查找的单词是：',select_value)
            print('查找单词的词义是：',d[select_value])
        else:
            print('您查找的单词不在词典中')

    dela = input('是否要删除单词Y/N：')
    if dela.lower() == 'y':
        delb = input('输入要删除的单词：')
        del d[delb]
        print('删除成功')
    byea = input('结束请输入bye，继续操作输入Y：')
    if byea == 'bye':
       break
'''

#19.输入一个正整数，输出其阶乘结果
'''
num_19 = int(input('输入个正整数：'))
res = 1
for i in range(1,num_19):
    res *=i
print(res)
'''
'''
20.计算存款利息
4种方法可选：
活期，年利率为r1；
一年期定息，年利率为r2；
存两次半年期定期，年利率为r3
两年期定息，年利率为r4
现有本金1000元，请分别计算出一年后按4种方法所得到的本息和。
? 提示：本息= 本金+ 本金* 年利率* 存款期
'''


#21.输入3个数字，以逗号隔开，输出其中最大的数
#num_21= input('输入3个数字，以逗号隔开:')
a = '11,22,33'
res =[] 
tmp = ''
for i in a:
    if i==',':
        print('逗号')
        res.append(tmp)
        tmp = ''
    else:
        tmp+=i
        
                
print(res)    


'''
22.输入一个年份，输出是否为闰年
是闰年的条件：
能被4整数但不能被100整除，或者能被400整除的年份都是闰年。


num_22 = int(input('输入年份：'))
if (num_22%4==0 and num_22%100==1) or num_22%400==0:
    print('是闰年')

else:
    print('不是闰年')
'''

#23.求两个正整数m和n的最大公约数



